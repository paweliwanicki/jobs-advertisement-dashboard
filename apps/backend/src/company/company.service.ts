import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { COMPANY_EXCEPTION_MESSAGES } from './company-exception.messages';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  create(company: UpdateCompanyDto) {
    company.createdAt = Math.floor(new Date().getTime() / 1000);
    const newCompany = this.companyRepository.create(company);
    return this.companyRepository.save(newCompany);
  }

  async findOneById(id: number) {
    if (!id) return null;
    return await this.companyRepository.findOneBy({ id });
  }

  async findOne(where: any) {
    return await this.companyRepository.findOne({ where: { ...where } });
  }

  async getAll() {
    return await this.companyRepository.find();
  }

  async update(id: number, attrs: Partial<Company>) {
    const company = await this.findOneById(id);
    if (!company) {
      throw new NotFoundException(COMPANY_EXCEPTION_MESSAGES.NOT_FOUND);
    }
    Object.assign(company, attrs);
    return this.companyRepository.save(company);
  }

  async remove(id: number) {
    const company = await this.findOneById(id);
    if (!company) {
      throw new NotFoundException(COMPANY_EXCEPTION_MESSAGES.NOT_FOUND);
    }
    return this.companyRepository.remove(company);
  }

  async importCompanies(body: any[]) {
    const currentCompanies = await this.getAll();

    if (body.length) {
      body.map((offer: any) => {
        const exist = currentCompanies.find(
          (company: Company) => company.name === offer.company,
        );
        if (exist) {
          console.warn(`${offer.company} is already exist!`);
          return false;
        }

        this.create({
          name: offer.company,
          logoFileName: offer.logo.split('/')[3],
          createdBy: 1,
        }).then((company: Company) => {
          currentCompanies.push(company);
        });
      });
    }

    return currentCompanies;
  }

  async setCompanyLogo(companyId: number, file: Express.Multer.File) {
    const { filename } = file;
    return await this.update(companyId, {
      logoFileName: filename,
    });
  }
}
