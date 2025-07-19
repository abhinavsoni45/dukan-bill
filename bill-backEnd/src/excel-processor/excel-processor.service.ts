import { Injectable } from '@nestjs/common';
// import { InjectQueue, Process, Processor } from '@nestjs/bull'; // Commented out BullMQ imports
// import { Job, Queue } from 'bullmq'; // Commented out BullMQ imports
import * as XLSX from 'xlsx';
import { GirviService } from 'src/girvi/girvi.service';
import { CreateGirviInput } from 'src/girvi/dto/create-girvi.input';
import { GirviItem } from 'src/girvi/entities/girviItem.entity';
import { readFileSync } from 'fs';

@Injectable()
// @Processor('excel-parse-queue') // Commented out BullMQ Processor decorator
export class ExcelProcessorService {
  constructor(
    // @InjectQueue('excel-parse-queue') private excelQueue: Queue, // Commented out BullMQ injection
    private readonly girviService: GirviService,
  ) {}

  // async addExcelProcessingJob(filePath: string, userId: string) {
  //   // Directly call handleParseExcel instead of adding to queue
  //   await this.handleParseExcel(filePath, userId);
  // }

  // // @Process('parse-excel') // Commented out BullMQ Process decorator
  // async handleParseExcel(filePath: string, userId: string) {
  //   // Modified to accept filePath and userId directly
  //   console.log(`Processing Excel file: ${filePath} for user: ${userId}`);
  //   console.log(`Processing Excel file: ${filePath} for user: ${userId}`);

  //   try {
  //     const workbook = XLSX.read(readFileSync(filePath), { type: 'buffer' });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const excelRows = XLSX.utils.sheet_to_json(worksheet);

  //     const girviEntities: CreateGirviInput[] = [];

  //     for (const row of excelRows) {
  //       const girviItem: GirviItem = {
  //         amtLoan: row['amount loan'],
  //         FullDescription: row['item'],
  //         grossWt: row['gross weight'],
  //         Value: row['value'],
  //       };

  //       const girviInput: CreateGirviInput = {
  //         // userId: userId,
  //         number: row['itemNo'],
  //         NameAddress: row['name'],
  //         date: row['start date'],
  //         endDate: row['end date'],
  //         GirviItems: [girviItem],
  //       };
  //       girviEntities.push(girviInput);
  //     }

  //     for (const girviInput of girviEntities) {
  //       await this.girviService.create(girviInput, userId);
  //     }

  //     console.log(
  //       `Successfully processed and saved ${girviEntities.length} Girvi entities.`,
  //     );
  //   } catch (error) {
  //     console.error(`Failed to process Excel file ${filePath}:`, error);
  //     throw error;
  //   }
  // }
}
