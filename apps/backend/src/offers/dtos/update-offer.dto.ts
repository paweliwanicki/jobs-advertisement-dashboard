import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Company } from 'src/company/company.entity';

export class UpdateOfferDto {
  @IsOptional()
  id: number;

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

  @IsOptional()
  unremovable: boolean;

  @IsOptional()
  createdAt: number;

  @IsOptional()
  createdBy: number;

  @IsOptional()
  company: Company;
}
