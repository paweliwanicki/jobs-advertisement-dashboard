import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
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
    const accessToken = await this.getJwtToken(user.id, user);
    const refreshToken = await this.getRefreshToken(user.id);

    await this.usersService.update(user.id, {
      refreshToken,
    });
    return {
      user,
      accessToken,
      refreshToken,
    };
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
    const accessToken = await this.getJwtToken(user.id, user);
    const refreshToken = await this.getRefreshToken(user.id);
    await this.usersService.update(user.id, {
      refreshToken,
    });
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async userSignOut(userId: number) {
    return this.usersService.update(userId, {
      refreshToken: null,
    });
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

  async refreshJwtToken(refreshToken: string) {
    const user = await this.usersService.findOne({ refreshToken });
    const newRefreshToken = await this.getRefreshToken(user.id);
    const newAccessToken = await this.getJwtToken(user.id, user);
    await this.usersService.update(user.id, {
      refreshToken: newRefreshToken,
    });
    return {
      newAccessToken,
      newRefreshToken,
    };
  }

  async getRefreshToken(sub: number) {
    return await this.jwtService.signAsync(
      {
        sub,
      },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRATION_TIME',
        ),
      },
    );
  }

  async getJwtToken(sub: number, user: User) {
    const userDetails: Partial<User> = {
      username: user.username,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    };

    return await this.jwtService.signAsync(
      {
        sub,
        ...userDetails,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
      },
    );
  }

  validateToken(token: string, options?: JwtVerifyOptions) {
    return this.jwtService.verify(token, options);
  }
}
