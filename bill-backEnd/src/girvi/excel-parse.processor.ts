import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as ExcelJS from 'exceljs';
import { GirviService } from './girvi.service';

@Processor('excel-parse-queue')
export class ExcelParseProcessor {
  constructor(private girviService: GirviService) {}

  @Process('parse-excel')
  async handleParseExcel(job: Job) {
    const { filePath } = job.data;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];
    const girviData = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      girviData.push({
        // Assuming the first column is 'name' and the second is 'amount'
        name: row.getCell(1).value,
        amount: row.getCell(2).value,
        // Add more fields as necessary based on your Excel structure
      });
      console.log(girviData, 'girvi data');
      //   console.log(row.values.slice(1), 'row values');
      //   const [field1, field2, ...] = row.values.slice(1); // adjust as per your columns
      //   girviData.push({ field1, field2, /* ... */ });
    });
    // await this.girviService.bulkInsert(girviData);
    // Optionally, delete the file after processing
  }
}
