import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpUserDto } from 'src/users/dtos/sign-up-user.dto';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { SignInUserDto } from 'src/users/dtos/sign-in-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: SignUpUserDto, @Session() session: any) {
    const { username, password } = body;
    const user = await this.authenticationService.userSignUp(
      username,
      password,
    );
    //session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signInUser(@Body() body: SignInUserDto, @Session() session: any) {
    const { username, password } = body;

    const user = await this.authenticationService.userSignIn(
      username,
      password,
    );
    //session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signOutUser(@Session() session: any) {
    session.userId = null;
  }
}
