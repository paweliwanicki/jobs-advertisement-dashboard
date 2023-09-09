import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from '../users/users.service';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { AUTH_STATUS_CODES } from './response.status.codes';
import { User } from 'src/users/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async userSignIn(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new NotFoundException({
        status: 2002,
        error: AUTH_STATUS_CODES[2002],
      });
    }
    return {
      access_token: this.getJwtToken(user.id, user),
    };
  }

  async userSignUp(username: string, password: string) {
    const currentUser = await this.validateUser(username, password);
    if (currentUser) {
      throw new BadRequestException({
        status: 2001,
        error: AUTH_STATUS_CODES[2001],
      });
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;
    const user = await this.usersService.create(username, result);
    return {
      access_token: this.getJwtToken(user.id, user),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const [salt, storedHash] = user.password.split('.');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      if (storedHash !== hash.toString('hex')) {
        throw new BadRequestException({
          status: 2002,
          error: AUTH_STATUS_CODES[2002],
        });
      }
      return user;
    }
    return null;
  }

  async refreshJwtToken(userId: number, refreshToken: string) {
    const user = await this.usersService.findOneById(userId);
    if (
      !user
      // || !user.refreshToken
    ) {
      throw new UnauthorizedException();
    }
  }

  getJwtToken(sub: number, user: User) {
    const userDetails: Partial<User> = {
      username: user.username,
      is_admin: user.is_admin,
      created_at: user.created_at,
    };

    return this.jwtService.sign({
      sub,
      ...userDetails,
    });
  }
}
