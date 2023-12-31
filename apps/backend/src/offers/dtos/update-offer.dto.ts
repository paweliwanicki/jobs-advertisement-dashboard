import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Company } from 'src/dictionaries/company/company.entity';

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

  @IsNumber()
  @IsNotEmpty()
  contractId: number;

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
