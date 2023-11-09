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
import { ContractService } from './contract.service';
import { UpdateContractDto } from './dtos/update-contract.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CONTRACT_EXCEPTION_MESSAGES } from './contract-exception.messages';

@Controller('dict/contract')
export class ContractController {
  constructor(private contractService: ContractService) {}

  @Get('/:id')
  async findContract(@Param('id') id: string) {
    const contract = await this.contractService.findOneById(parseInt(id));
    if (!contract) {
      throw new NotFoundException();
    }
    return contract;
  }

  @Get()
  async getCompanies() {
    const contract = await this.contractService.getAll();
    if (!contract) {
      throw new NotFoundException();
    }
    return contract;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addUpdateContract(
    @Body() body: UpdateContractDto,
    @CurrentUser() user: User,
  ) {
    const currentContract = await this.contractService.findOne({
      name: body.name,
    });
    if (currentContract) {
      throw new BadRequestException({
        status: 404,
        message: CONTRACT_EXCEPTION_MESSAGES.COMPANY_EXIST,
      });
    }
    body.createdBy = user.id;
    return this.contractService.create(body);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  removeOffer(@Param('id') id: string) {
    return this.contractService.remove(parseInt(id));
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateOffer(
    @Param('id') id: string,
    @Body() body: UpdateContractDto,
    @CurrentUser() user: User,
  ) {
    const updContract = {
      ...body,
      modifiedAt: Math.floor(new Date().getTime() / 1000),
      modifiedBy: user.id,
    };

    return this.contractService.update(parseInt(id), updContract);
  }
}
