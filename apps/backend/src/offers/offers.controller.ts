import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Delete,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { OfferDto } from './dtos/offer.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompanyService } from 'src/dictionaries/company/company.service';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
@Controller('offers')
export class OffersController {
  constructor(
    private offersService: OffersService,
    private companyService: CompanyService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addOffer(@Body() body: UpdateOfferDto, @CurrentUser() user: User) {
    const company = await this.companyService.findOneById(body.companyId);
    const newOffer = {
      ...body,
      company,
      createdAt: Math.floor(new Date().getTime() / 1000),
      createdBy: user.id,
    };

    const offer = await this.offersService.create(newOffer);
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
  async findOffers() {
    return await this.offersService.findAll();
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async removeOffer(@Param('id') id: string) {
    return await this.offersService.remove(parseInt(id));
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateOffer(@Body() body: UpdateOfferDto, @CurrentUser() user: User) {
    const { id, companyId } = body;

    const company = await this.companyService.findOneById(companyId);
    const updOffer = {
      ...body,
      company,
      modifiedAt: Math.floor(new Date().getTime() / 1000),
      modifiedBy: user.id,
    };
    return await this.offersService.update(id, updOffer);
  }

  @Post('uploadCompanyLogo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = 'uploads/';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${file.originalname.replace(/\s/g, '_')}`);
        },
      }),
    }),
  )
  async uploadCompanyLogo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('companyId') companyId: number,
  ) {
    await this.companyService.setCompanyLogo(companyId, file);
    return {
      file: file.buffer?.toString(),
    };
  }

  @Post('/import')
  @Serialize(OfferDto)
  @UseGuards(JwtAuthGuard)
  async importOffers(@Body() body: any, @CurrentUser() user: User) {
    body.user = user;
    console.warn('1 step - import companies');
    await this.companyService.importCompanies(body);
    console.warn('2 step - import offers');
    await this.offersService.importOffers(body);
    return true;
  }
}
