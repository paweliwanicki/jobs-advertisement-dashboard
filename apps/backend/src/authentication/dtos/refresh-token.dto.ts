import { IsNumber, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNumber()
  userId: number;

  @IsString()
  token: string;
}
