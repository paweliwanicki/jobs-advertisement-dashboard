import { Module } from '@nestjs/common';
import { DictionariesController } from './dictionaries.controller';
import { DictionariesService } from './dictionaries.service';
import { ContractModule } from './contract/contract.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  controllers: [DictionariesController],
  providers: [DictionariesService],
  imports: [ContractModule, CompanyModule],
})
export class DictionariesModule {}
