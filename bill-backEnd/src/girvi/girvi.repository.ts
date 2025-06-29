import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Girvi } from './entities/girvi.entity';

@Injectable()
export class GirviRepository extends AbstractRepository<Girvi> {
  protected readonly logger = new Logger(GirviRepository.name);

  constructor(@InjectModel(Girvi.name) girviModel: Model<Girvi>) {
    super(girviModel);
  }
}
