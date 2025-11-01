import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { GirviService } from './girvi.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';

// @Controller('girvi')
// export class GirviController {
//   constructor(@InjectQueue('excel-parse-queue') private excelQueue: Queue) {}

//   @Post('upload-excel')
//   @UseInterceptors(FileInterceptor('file', { dest: './temp' }))
//   async uploadExcel(@UploadedFile() file: Express.Multer.File) {
//     await this.excelQueue.add('parse-excel', { filePath: file.path });
//     return { message: 'File uploaded and queued for processing' };
//   }
// }
@Controller('girvi')
export class GirviController {
  constructor(private readonly girviService: GirviService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // @Req() req,
    @CurrentUser() user: TokenPayload,
  ) {
    console.log('Received file in controller:', file);
    console.log(
      'File buffer:',
      file.buffer,
      'Type of file buffer:',
      typeof file.buffer,
    );
    return this.girviService.saveExcelToTemp(file.buffer, user._id);
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  async getCount() {
    return this.girviService.getCount();
  }
}
