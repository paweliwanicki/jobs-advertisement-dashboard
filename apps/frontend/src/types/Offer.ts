import { Company } from './Company';
import { Contract } from './Contract';

export type Offer = {
  id?: number;
  title: string;
  company: Company;
  location: string;
  description: string;
  contract: Contract;
  createdAt?: number;
  createdBy?: number;
  unremovable?: boolean;
  companyLogo?: File;
};
