import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authenticationService.userSignUp(
      body.email,
      body.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signInUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authenticationService.userSignIn(
      body.email,
      body.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signOutUser(@Session() session: any) {
    session.userId = null;
  }
}
