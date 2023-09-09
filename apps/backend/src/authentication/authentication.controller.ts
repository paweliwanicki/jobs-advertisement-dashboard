import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpUserDto } from '../users/dtos/sign-up-user.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { SignInUserDto } from '../users/dtos/sign-in-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/jwt-refresh.guard';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

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
    const access_token = await this.authenticationService.userSignUp(
      username,
      password,
    );
    return access_token;
  }

  @Post('/signin')
  async signInUser(@Body() body: SignInUserDto) {
    const { username, password } = body;

    const access_token = await this.authenticationService.userSignIn(
      username,
      password,
    );
    return access_token;
  }

  @Post('/signout')
  async signOutUser() {
    console.log('logout');
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refreshToken')
  async refreshJwtToken(@Body() body: RefreshTokenDto) {
    const { userId, token } = body;
  }
}
