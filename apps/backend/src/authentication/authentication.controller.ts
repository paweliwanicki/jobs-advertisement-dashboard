import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpUserDto } from 'src/users/dtos/sign-up-user.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { SignInUserDto } from 'src/users/dtos/sign-in-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('/whoami')
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/myprofile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('/signup')
  async createUser(@Body() body: SignUpUserDto, @Session() session: any) {
    const { username, password } = body;
    const { access_token } = await this.authenticationService.userSignUp(
      username,
      password,
    );
    session.token = access_token;
    return access_token;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signInUser(@Body() body: SignInUserDto, @Session() session: any) {
    const { username, password } = body;

    const { access_token } = await this.authenticationService.userSignIn(
      username,
      password,
    );
    session.token = access_token;
    return access_token;
  }

  @Post('/signout')
  async signOutUser(@Session() session: any) {
    console.log('logout');
    session.token = null;
  }
}
