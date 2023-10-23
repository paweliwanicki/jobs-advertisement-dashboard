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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { OfferDto } from './dtos/offer.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Post()
  @Serialize(OfferDto)
  @UseGuards(JwtAuthGuard)
  async addOffer(@Body() body: UpdateOfferDto, @CurrentUser() user: User) {
    const newOffer = {
      ...body,
      createdAt: Math.floor(new Date().getTime() / 1000),
      createdBy: user.id,
    };

    const offer = await this.offersService.create(newOffer);
    return offer;
  }

  @Post('/import')
  @Serialize(OfferDto)
  @UseGuards(JwtAuthGuard)
  async importOffers(@Body() body: any, @CurrentUser() user: User) {
    let offers = [];
    if (body.length) {
      offers = body.map((offer: any) => {
        const newOffer: Partial<OfferDto & { unremovable: boolean }> = {
          title: offer.position,
          company: offer.company,
          contract: offer.contract,
          location: offer.location,
          description: `${offer.description}
                  ${offer.role.content}
                  ${offer.role.items}
                  ${offer.requirements.content}
                  ${offer.requirements.items}
                `,
          unremovable: true,
        };
        return newOffer;
      });
      if (offers.length) {
        offers.forEach(async (offer: any) => await this.addOffer(offer, user));
      }
    }

    return offers;
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
  @UseGuards(JwtAuthGuard)
  removeOffer(@Param('id') id: string) {
    return this.offersService.remove(parseInt(id));
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
