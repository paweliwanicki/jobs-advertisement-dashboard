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
  workTime: string;
  @Expose()
  company: string;
  @Expose()
  createdAt: number;
  @Expose()
  createdBy: number;
  @Expose()
  modifiedAt: number;
  @Expose()
  modifiedBy: number;
}
