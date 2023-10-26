import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { COMPANY_EXCEPTION_MESSAGES } from './company-exception.messages';

@Controller('dict/company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('/:id')
  async findCompany(@Param('id') id: string) {
    const company = await this.companyService.findOneById(parseInt(id));
    if (!company) {
      throw new NotFoundException();
    }
    return company;
  }

  @Get()
  async getCompanies() {
    const company = await this.companyService.getAll();
    if (!company) {
      throw new NotFoundException();
    }
    return company;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addCompany(@Body() body: UpdateCompanyDto, @CurrentUser() user: User) {
    const currentCompany = this.companyService.findOne({ name: body.name });
    if (currentCompany) {
      throw new BadRequestException({
        status: 404,
        message: COMPANY_EXCEPTION_MESSAGES.COMPANY_EXIST,
      });
    }
    body.createdBy = user.id;
    return this.companyService.create(body);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  removeOffer(@Param('id') id: string) {
    return this.companyService.remove(parseInt(id));
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateOffer(
    @Param('id') id: string,
    @Body() body: UpdateCompanyDto,
    @CurrentUser() user: User,
  ) {
    const updCompany = {
      ...body,
      modifiedAt: Math.floor(new Date().getTime() / 1000),
      modifiedBy: user.id,
    };

    return this.companyService.update(parseInt(id), updCompany);
  }
}
