import { Company } from './Company';

export type Offer = {
  id?: number;
  title: string;
  company?: Company;
  companyId: number; // fix to only Company!;
  location: string;
  contract: string;
  description: string;
  createdAt?: number;
  unremovable?: boolean;
  companyLogo?: File;
};
