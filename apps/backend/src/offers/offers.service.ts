import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { Repository } from 'typeorm';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { OFFER_EXCEPTION_MESSAGES } from './offer-exception.messages';

@Injectable()
export class OffersService {
  constructor(@InjectRepository(Offer) private repo: Repository<Offer>) {}

  create(offer: UpdateOfferDto) {
    const newOffer = this.repo.create(offer);
    return this.repo.save(newOffer);
  }

  findOneById(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  findByUserId(createdBy: number) {
    return this.repo.find({ where: { createdBy } });
  }

  findOne(where: any) {
    return this.repo.findOne({ where: { ...where } });
  }

  async update(id: number, attrs: Partial<Offer>) {
    const offer = await this.findOneById(id);
    if (!offer) {
      throw new NotFoundException(OFFER_EXCEPTION_MESSAGES.NOT_FOUND);
    }
    Object.assign(offer, attrs);
    return this.repo.save(offer);
  }

  async remove(id: number) {
    const offer = await this.findOneById(id);
    if (!offer) {
      throw new NotFoundException(OFFER_EXCEPTION_MESSAGES.NOT_FOUND);
    }
    return this.repo.remove(offer);
  }
}
