import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AUTH_STATUS_CODES } from './response.status.codes';
import { User } from 'src/users/user.entity';
import { ConfigService } from '@nestjs/config';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async userSignIn(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new NotFoundException({
        statusCode: 2002,
        message: AUTH_STATUS_CODES[2002],
      });
    }
    const tokens = this.getJwtTokens(user.id, user);
    this.updateUserRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async userSignUp(username: string, password: string) {
    const currentUser = await this.validateUser(username, password);
    if (currentUser) {
      throw new BadRequestException({
        statusCode: 2001,
        message: AUTH_STATUS_CODES[2001],
      });
    }
    const salt = await genSalt(8);
    const hashed = await hash(password, salt);
    const user = await this.usersService.create(username, hashed);
    const tokens = this.getJwtTokens(user.id, user);
    this.updateUserRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async userSignOut(userId: number) {
    return this.updateUserRefreshToken(userId, null);
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        throw new BadRequestException({
          statusCode: 2002,
          message: AUTH_STATUS_CODES[2002],
        });
      }
      return user;
    }
    return null;
  }

  async refreshJwtToken(userId: number, refreshToken: string) {
    const user = await this.usersService.findOneById(userId);
    const checkRefreshToken = await compare(refreshToken, user.refreshToken);
    if (!user || !user.refreshToken || !checkRefreshToken) {
      throw new UnauthorizedException();
    }
    const tokens = this.getJwtTokens(user.id, user);
    return tokens;
  }

  async updateUserRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshedtoken = refreshToken
      ? await hash(refreshToken, 8)
      : null;
    return this.usersService
      .update(userId, {
        refreshToken: hashedRefreshedtoken,
      })
      .then(() => true)
      .catch(() => false);
  }

  getJwtTokens(sub: number, user: User) {
    const userDetails: Partial<User> = {
      username: user.username,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    };
    return {
      accessToken: this.jwtService.sign(
        {
          sub,
          ...userDetails,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      ),
      refreshToken: this.jwtService.sign(
        {
          sub,
          ...userDetails,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_EXPIRATION_TIME',
          ),
        },
      ),
    };
  }
}
