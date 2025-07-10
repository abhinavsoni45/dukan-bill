import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GirviService } from './girvi.service';
import { GirviRepository } from './girvi.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Girvi, GirviSchema } from './entities/girvi.entity';
import { GirviController } from './girvi.controller';
import { GirviResolver } from './girvi.resolver';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Girvi.name, schema: GirviSchema }]),
    MulterModule.register({
      dest: './temp',
    }),
  ],
  providers: [GirviResolver, GirviService, GirviRepository],
  controllers: [GirviController],
})
export class GirviModule {}
