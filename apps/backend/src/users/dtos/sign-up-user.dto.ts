import { IsString, Matches } from 'class-validator';
import { Match } from '../../decorators/Match.decorator';

export class SignUpUserDto {
  @IsString()
  @Matches('^(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{6,12}$')
  username: string;
  @IsString()
  @Matches(
    '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$',
  )
  password: string;
  @IsString()
  @Match('password')
  confirmPassword: string;
}
