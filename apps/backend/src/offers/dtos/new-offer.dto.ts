import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Company } from 'src/dictionaries/company/company.entity';
import { Contract } from 'src/dictionaries/contract/contract.entity';

export class NewOfferDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  contract: Contract;

  @IsNotEmpty()
  company: Company;

  @IsOptional()
  unremovable: boolean;

  @IsOptional()
  createdAt: number;

  @IsOptional()
  createdBy: number;
}
