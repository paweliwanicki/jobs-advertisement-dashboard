import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from '../users/users.service';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async userSignUp(username: string, password: string) {
    const currentUser = await this.usersService.findOneByUsername(username);
    if (currentUser) {
      throw new BadRequestException('Username is in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;
    const user = await this.usersService.create(username, result);

    return {
      access_token: this.getJwtToken(user.id, user.username),
    };
  }

  async userSignIn(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong email or password!');
    }

    return user;
  }

  async getJwtToken(sub: number, username: string) {
    return this.jwtService.sign({
      sub,
      username,
    });
  }

  @Serialize(UserDto)
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const [salt, storedHash] = user.password.split('.');
      const hash = (await scrypt(pass, salt, 32)) as Buffer;
      if (storedHash !== hash.toString('hex')) {
        throw new BadRequestException('Wrong email or password!');
      }
      return user;
    }
    return null;
  }
}
