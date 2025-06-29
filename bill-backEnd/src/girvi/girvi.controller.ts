import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('girvi')
export class GirviController {
  constructor(@InjectQueue('excel-parse-queue') private excelQueue: Queue) {}

  @Post('upload-excel')
  @UseInterceptors(FileInterceptor('file', { dest: './temp' }))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    await this.excelQueue.add('parse-excel', { filePath: file.path });
    return { message: 'File uploaded and queued for processing' };
  }
}
