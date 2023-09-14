import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private authService: AuthenticationService,
  ) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const { accessToken } = request.cookies['auth-tokens'];
          return accessToken;
        },
      ]),
    });
  }

  async validate(request: Request, payload: any) {
    if (!payload) {
      throw new BadRequestException('Invalid jwt token');
    }
    const { refreshToken } = request.cookies['auth-tokens'];
    if (!refreshToken) {
      throw new BadRequestException('Invalid refresh token');
    }
    const user = await this.authService.validateRefreshToken(
      payload.sub,
      refreshToken,
    );
    if (!user) {
      throw new UnauthorizedException('Token expired');
    }
    return { ...payload, refreshToken };
  }
}
