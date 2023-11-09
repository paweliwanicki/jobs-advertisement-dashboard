import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { Repository } from 'typeorm';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { OFFER_EXCEPTION_MESSAGES } from './offer-exception.messages';
import { Company } from 'src/dictionaries/company/company.entity';
import { CompanyService } from 'src/dictionaries/company/company.service';

@Injectable()
export class OffersService {
  constructor(
    private companyService: CompanyService,
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
  ) {}

  create(offer: UpdateOfferDto) {
    const newOffer = this.offerRepository.create(offer);
    return this.offerRepository.save(newOffer);
  }

  async findOneById(id: number) {
    if (!id) return null;
    return await this.offerRepository.findOne({
      where: { id: id },
      relations: { company: true },
    });
  }

  async findByUserId(createdBy: number) {
    return this.offerRepository.find({ where: { createdBy } });
  }

  async findOne(where: any) {
    return await this.offerRepository.findOne({
      where: { ...where },
      relations: { company: true },
    });
  }

  async findAll(where?: any) {
    return await this.offerRepository.find({
      where: { ...where },
      relations: { company: true },
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
    return this.offerRepository.remove(offer);
  }

  async importOffers(body: any) {
    const offers = [];
    const currentCompanies = await this.companyService.getAll();
    if (body.length) {
      body.map((offer: any) => {
        const company = currentCompanies.find((company: Company) => {
          return company.name === offer.company;
        });

        const newOffer: any = {
          company: company,
          title: offer.position,
          contract: offer.contract,
          location: offer.location,
          description: `${offer.description}
                    ${offer.role.content}
                    ${offer.role.items}
                    ${offer.requirements.content}
                    ${offer.requirements.items}`,
          unremovable: true,
          createdAt: Math.floor(new Date().getTime() / 1000),
          createdBy: body.user.id,
        };
        this.create(newOffer);
        offers.push(newOffer);
      });
    }
    return offers;
  }
}
