import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { FindOperator } from 'typeorm';

export class FiltersOfferDto {
  @IsString()
  @IsOptional()
  title: FindOperator<string>;

  @IsString()
  @IsOptional()
  location: string;

  @IsOptional()
  contract: {
    id: number;
  };

  @IsOptional()
  company: {
    id: number;
  };

  @IsBoolean()
  @IsOptional()
  archived: boolean;

  @IsOptional()
  createdBy: number;
}
