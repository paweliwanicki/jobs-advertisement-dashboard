import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateOfferDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  contract: string;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  unremovable: boolean;
  createdAt: number;
  createdBy: number;
}
