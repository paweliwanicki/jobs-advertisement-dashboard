import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { OfferDto } from './dtos/offer.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('offers')
@UseGuards(JwtAuthGuard)
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Post()
  @Serialize(OfferDto)
  async addOffer(@Body() body: UpdateOfferDto, @CurrentUser() user: User) {
    const newOffer = {
      ...body,
      createdAt: Math.floor(new Date().getTime() / 1000),
      createdBy: user.id,
    };

    const offer = await this.offersService.create(newOffer);
    console.log(offer);
    return offer;
  }

  @Get('/:id')
  async findOffer(@Param('id') id: string) {
    const offer = await this.offersService.findOneById(parseInt(id));
    if (!offer) {
      throw new NotFoundException();
    }
    return offer;
  }

  @Get()
  findOffersByUserId(@Query('createdBy') createdBy: number) {
    return this.offersService.findByUserId(createdBy);
  }

  @Delete('/:id')
  removeOffer(@Param('id') id: string) {
    return this.offersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateOffer(
    @Param('id') id: string,
    @Body() body: UpdateOfferDto,
    @CurrentUser() user: User,
  ) {
    const updOffer = {
      ...body,
      modifiedAt: Math.floor(new Date().getTime() / 1000),
      modifiedBy: user.id,
    };

    return this.offersService.update(parseInt(id), updOffer);
  }
}
