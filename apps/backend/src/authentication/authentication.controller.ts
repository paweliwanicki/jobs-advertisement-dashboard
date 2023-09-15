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
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';

@Serialize(UserDto)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('/getuser')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  async getUser(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(
    @Body() body: SignUpUserDto,
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() user: UserDto,
  ) {
    const { username, password } = body;
    const tokens = await this.authenticationService.userSignUp(
      username,
      password,
    );
    response.cookie('auth-tokens', tokens, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 30 * 1000),
    });
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signInUser(
    @Body() body: SignInUserDto,
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() user: UserDto,
  ) {
    const { username, password } = body;

    const tokens = await this.authenticationService.userSignIn(
      username,
      password,
    );
    response.cookie('auth-tokens', tokens, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 30 * 1000),
    });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/signout')
  async signOutUser(@CurrentUser() user: User, @Res() response: Response) {
    await this.authenticationService.userSignOut(user.id);
    response
      .clearCookie('auth-tokens')
      .send({ statusCode: 200, message: 'ok' });
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('/refreshToken')
  async refreshJwtToken(
    @Req() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authenticationService.refreshJwtToken(
      request.user.sub,
      request.user.refreshToken,
    );

    response
      .cookie('auth-tokens', tokens, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 30 * 1000),
      })
      .send({ statusCode: 200, message: 'ok' });
  }
}
