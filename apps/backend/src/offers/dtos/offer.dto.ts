import { Expose } from 'class-transformer';

export class OfferDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  desciption: string;
  @Expose()
  location: string;
  @Expose()
  workTime: string;
  @Expose()
  company: string;
  @Expose()
  country: string;
  @Expose()
  createdAt: number;
  @Expose()
  createdBy: number;
  @Expose()
  modifiedAt: number;
  @Expose()
  modifiedBy: number;
}
