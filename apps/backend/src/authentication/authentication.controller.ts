import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpUserDto } from '../users/dtos/sign-up-user.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { SignInUserDto } from '../users/dtos/sign-in-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('/whoami')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: SignUpUserDto) {
    const { username, password } = body;
    const accessTokens = await this.authenticationService.userSignUp(
      username,
      password,
    );
    return accessTokens;
  }

  @Post('/signin')
  async signInUser(@Body() body: SignInUserDto) {
    const { username, password } = body;

    const accessTokens = await this.authenticationService.userSignIn(
      username,
      password,
    );
    return accessTokens;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/signout')
  async signOutUser(@CurrentUser() user: User) {
    return this.authenticationService.userSignOut(user.id);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('/refreshToken')
  async refreshJwtToken(@Req() request) {
    return this.authenticationService.refreshJwtToken(
      request.user.sub,
      request.user.refreshToken,
    );
  }
}
