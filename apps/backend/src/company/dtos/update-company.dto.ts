import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsString()
  // @IsNotEmpty()
  logoFileName: string;
  modifiedBy?: number;
  modifiedAt?: number;
  createdBy?: number;
  createdAt?: number;
}
