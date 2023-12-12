import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { Offer } from './offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { MulterModule } from '@nestjs/platform-express';
import { CompanyModule } from 'src/dictionaries/company/company.module';
import { ContractModule } from 'src/dictionaries/contract/contract.module';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [
    TypeOrmModule.forFeature([Offer]),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthenticationModule,
    CompanyModule,
    ContractModule,
  ],
  exports: [OffersService],
})
export class OffersModule {}
