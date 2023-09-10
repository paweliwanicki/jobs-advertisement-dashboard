import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AUTH_STATUS_CODES } from 'src/authentication/response.status.codes';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(username: string, password: string) {
    const user = this.repo.create({
      username,
      password,
      createdAt: Math.floor(new Date().getTime() / 1000),
    });
    return this.repo.save(user);
  }

  findOneById(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  findOneByUsername(username: string) {
    return this.repo.findOneBy({ username });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(AUTH_STATUS_CODES[2000]);
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(AUTH_STATUS_CODES[2000]);
    }
    return this.repo.remove(user);
  }
}