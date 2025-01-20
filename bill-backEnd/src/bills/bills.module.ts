import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsResolver } from './bills.resolver';
import { DatabaseModule } from '../common/database/database.module';
import { Bill, BillSchema } from './entities/bill.entity';
import { BillsRepository } from './bills.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
  ],
  providers: [BillsResolver, BillsService, BillsRepository],
})
export class BillsModule {}
