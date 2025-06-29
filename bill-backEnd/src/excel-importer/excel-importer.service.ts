import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateExcelImporterInput } from './dto/create-excel-importer.input';
import { UpdateExcelImporterInput } from './dto/update-excel-importer.input';

@Injectable()
export class ExcelImporterService {
  constructor(@InjectQueue('excel-processing') private readonly queue: Queue) {}

  create(createExcelImporterInput: CreateExcelImporterInput) {
    return 'This action adds a new excelImporter';
  }

  findAll() {
    return `This action returns all excelImporter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} excelImporter`;
  }

  update(id: number, updateExcelImporterInput: UpdateExcelImporterInput) {
    return `This action updates a #${id} excelImporter`;
  }

  remove(id: number) {
    return `This action removes a #${id} excelImporter`;
  }

  async queueExcelFile(filePath: string) {
    // Add the file to the 'excel-processing' queue with the job name 'parse-excel'
    await this.queue.add('parse-excel', { filePath });
    return { message: 'File queued for processing.' };
  }
}
