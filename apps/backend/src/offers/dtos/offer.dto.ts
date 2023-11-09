import { Expose } from 'class-transformer';

export class OfferDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  location: string;
  @Expose()
  contract: string;
  @Expose()
  companyId: number;
  @Expose()
  createdAt: number;
  @Expose()
  createdBy: number;
  @Expose()
  modifiedAt: number;
  @Expose()
  modifiedBy: number;
  @Expose()
  unremovable: boolean;
  @Expose()
  company: string;
}
