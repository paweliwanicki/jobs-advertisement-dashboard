import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FiltersOfferDto {
  @IsString()
  @IsOptional()
  position: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsNumber()
  @IsOptional()
  contractId: number;

  @IsNumber()
  @IsOptional()
  companyId: number;

  @IsBoolean()
  @IsOptional()
  showArchived: boolean;
}
