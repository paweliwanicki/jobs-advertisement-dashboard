import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service';
import { NextFunction, Request } from 'express';
import { User } from '../user.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.session || {};
    console.log(request.session);

    if (userId) {
      const user = await this.usersService.findOneById(userId);
      request.currentUser = user;
    }

    next();
  }
}
