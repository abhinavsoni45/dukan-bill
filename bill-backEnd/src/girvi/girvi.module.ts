import { Module } from '@nestjs/common';
import { GirviService } from './girvi.service';
import { GirviResolver } from './girvi.resolver';
import { GirviRepository } from './girvi.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Girvi, GirviSchema } from './entities/girvi.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Girvi.name, schema: GirviSchema }]),
  ],
  providers: [GirviResolver, GirviService, GirviRepository],
})
export class GirviModule {}
