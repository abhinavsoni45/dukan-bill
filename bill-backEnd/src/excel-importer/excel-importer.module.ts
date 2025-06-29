import { Module } from '@nestjs/common';
import { ExcelImporterService } from './excel-importer.service';
import { ExcelImporterResolver } from './excel-importer.resolver';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  // imports: [
  //   DatabaseModule.forFeature([{name: }])
  // ]
  providers: [ExcelImporterResolver, ExcelImporterService],
})
export class ExcelImporterModule {}
