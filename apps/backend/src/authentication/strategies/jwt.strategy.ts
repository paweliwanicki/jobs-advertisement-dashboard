import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UserDto } from '../../users/dtos/user.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  @Serialize(UserDto)
  async validate(payload: any) {
    const user = await this.usersService.findOneByUsername(payload.username);
    console.log(payload.username);
    //console.log(payload);
    if (!user || user.id !== payload.sub) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
