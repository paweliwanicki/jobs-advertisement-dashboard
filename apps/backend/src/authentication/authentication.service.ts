import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from '../users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {}

  async userSignUp(username: string, password: string) {
    const currentUser = await this.userService.findOneByUsername(username);
    if (currentUser) {
      throw new BadRequestException('Username is in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;
    const user = await this.userService.create(username, result);
    return user;
  }

  async userSignIn(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
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
}
