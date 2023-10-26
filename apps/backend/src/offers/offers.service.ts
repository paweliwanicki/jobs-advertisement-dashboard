import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { Repository } from 'typeorm';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { OFFER_EXCEPTION_MESSAGES } from './offer-exception.messages';
import { Company } from 'src/company/company.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
  ) {}

  create(offer: UpdateOfferDto) {
    const newOffer = this.offerRepository.create(offer);
    return this.offerRepository.save(newOffer);
  }

  async findOneById(id: number) {
    if (!id) return null;
    return await this.offerRepository.findOneBy({ id });
  }

  async findByUserId(createdBy: number) {
    console.log(
      await this.findAll({
        where: { createdBy },
        //relations: { companyId: true },
      }),
    );
    return this.offerRepository.find({ where: { createdBy } });
  }

  async findOne(where: any) {
    return await this.offerRepository.findOne({ where: { ...where } });
  }
  async findAll(where?: any) {
    return await this.offerRepository.find({ where: { ...where } });
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

  async importOffers(body: any, companies: Company[]) {
    const offers = [];
    if (body.length) {
      body.map(async (offer: any) => {
        const { id: companyId } = companies.find((company: Company) => {
          return company.name === offer.company;
        });

        const newOffer: UpdateOfferDto = {
          companyId,
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
        await this.create(newOffer);
        offers.push(newOffer);
      });
    }
    return offers;
  }
}
