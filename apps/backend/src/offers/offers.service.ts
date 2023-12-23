import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { ILike, Repository } from 'typeorm';
import { OFFER_EXCEPTION_MESSAGES } from './offer-exception.messages';
import { CompanyService } from 'src/dictionaries/company/company.service';
import { ContractService } from 'src/dictionaries/contract/contract.service';
import { ImportOfferDto } from './dtos/import-offer.dto';
import { NewOfferDto } from './dtos/new-offer.dto';
import { User } from 'src/users/user.entity';
import { FiltersOfferDto } from './dtos/filters-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    private companyService: CompanyService,
    private contractService: ContractService,
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
  ) {}

  async create(offer: NewOfferDto) {
    const newOffer = this.offerRepository.create(offer);
    return await this.offerRepository.save(newOffer);
  }

  async findOneById(id: number) {
    if (!id) return null;
    return await this.offerRepository.findOne({
      where: { id: id },
      relations: { company: true, contract: true },
    });
  }

  async findByUserId(createdBy: number) {
    return this.offerRepository.find({ where: { createdBy } });
  }

  async findOne(where: FiltersOfferDto) {
    return await this.offerRepository.findOne({
      where,
      relations: { company: true, contract: true },
    });
  }

  async findAll(where: FiltersOfferDto) {
    if (where.title) {
      where.title = ILike(`%${where.title}%`);
    }
    return await this.offerRepository.find({
      where,
      relations: { company: true, contract: true },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(id: number, attrs: Partial<Offer>) {
    const offer = await this.findOneById(id);
    if (!offer) {
      throw new NotFoundException(OFFER_EXCEPTION_MESSAGES.NOT_FOUND);
    }
    Object.assign(offer, attrs);
    return this.offerRepository.save(offer);
  }

  async remove(id: number) {
    const offer = await this.findOneById(id);
    if (!offer) {
      throw new NotFoundException(OFFER_EXCEPTION_MESSAGES.NOT_FOUND);
    }
    if (offer.unremovable) {
      throw new NotFoundException(OFFER_EXCEPTION_MESSAGES.UNREMOVABLE);
    }
    return this.offerRepository.remove(offer);
  }

  async importOffers(data: ImportOfferDto[], user: User) {
    const offers = [];
    if (data.length) {
      data.forEach(
        async ({
          company,
          contract,
          position,
          location,
          description,
          role,
          requirements,
        }: ImportOfferDto) => {
          const existingCompany = await this.companyService.findOne({
            name: company,
          });

          const existingContract = await this.contractService.findOne({
            name: contract,
          });

          if (existingCompany && existingContract) {
            const newOffer: NewOfferDto = {
              title: position,
              contract: existingContract,
              company: existingCompany,
              location: location,
              description: `<p>${description}</p>
              <p>${role.content}</p>
              <br/>
              <ul>
              ${role.items.map((item: string) => `<li>${item}</li>`).join('')}
              </ul>
              <br/>
              <p>\t${requirements.content}</p>
              <br/>
              <ul>
              ${requirements.items
                .map((item: string) => `<li>${item}</li>`)
                .join('')}
              </ul>`,
              unremovable: true,
              createdAt: Math.floor(new Date().getTime() / 1000),
              createdBy: user.id,
            };
            return await this.create(newOffer);
          }
        },
      );
    }
    return offers;
  }
}
