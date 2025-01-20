import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillsRepository extends AbstractRepository<Bill> {
  protected readonly logger = new Logger(BillsRepository.name);

  constructor(@InjectModel(Bill.name) billModel: Model<Bill>) {
    super(billModel);
  }
}
