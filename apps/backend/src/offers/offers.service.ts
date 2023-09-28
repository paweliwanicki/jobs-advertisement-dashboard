import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { Repository } from 'typeorm';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { OFFER_EXCEPTION_MESSAGES } from './offer-exception.messages';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
  ) {}

  create(offer: UpdateOfferDto) {
    const newOffer = this.offerRepository.create(offer);
    return this.offerRepository.save(newOffer);
  }

  findOneById(id: number) {
    if (!id) return null;
    return this.offerRepository.findOneBy({ id });
  }

  findByUserId(createdBy: number) {
    return this.offerRepository.find({ where: { createdBy } });
  }

  findOne(where: any) {
    return this.offerRepository.findOne({ where: { ...where } });
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
}
