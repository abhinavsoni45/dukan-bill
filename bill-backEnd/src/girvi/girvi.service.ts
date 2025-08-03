import { Injectable } from '@nestjs/common';
import { CreateGirviInput } from './dto/create-girvi.input';
import { UpdateGirviInput } from './dto/update-girvi.input';
import { GirviRepository } from './girvi.repository';
import * as XLSX from 'xlsx';
// import { ExcelProcessorService } from '../excel-processor/excel-processor.service';
import { join, dirname } from 'path';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
} from 'fs';
import { GirviItem } from './entities/girviItem.entity';
import { GirviFilterQuery } from './dto/girvi-query.input';

@Injectable()
export class GirviService {
  constructor(private readonly girviRepository: GirviRepository) {}

  async create(createGirviInput: CreateGirviInput, userId: string) {
    return this.girviRepository.create({
      ...createGirviInput,
      userId,
    });
  }

  async findAll(girviFilterQuery?: GirviFilterQuery) {
    const filter = {};
    if (girviFilterQuery?.number) {
      filter['series'] = girviFilterQuery.number;
    }
    if (girviFilterQuery?.filter?.status === 'blue') {
      filter['endDate'] = { $ne: null };
    } else if (girviFilterQuery?.filter?.status === 'yellow') {
      filter['endDate'] = null;
    } else if (girviFilterQuery?.filter?.status === 'all') {
      // No filter needed when 'all' is selected
    }

    const sort = {};
    if (girviFilterQuery?.sort?.sortBy === 'amtLoan') {
      const girvis = await this.girviRepository.find(filter);
      return girvis.sort((a, b) => {
        const aMaxLoan = Math.max(
          ...a.GirviItems.map((item) => Number(item.amtLoan)),
        );
        const bMaxLoan = Math.max(
          ...b.GirviItems.map((item) => Number(item.amtLoan)),
        );
        return bMaxLoan - aMaxLoan;
      });
    } else {
      sort['number'] = 1;
    }

    return this.girviRepository.find(filter, { sort });
  }

  // In your girvi.service.ts

  async findSeriesRange() {
    try {
      const result = await this.girviRepository.aggregate([
        {
          $group: {
            _id: null,
            minSeries: { $min: '$series' },
            maxSeries: { $max: '$series' },
          },
        },
      ]);

      return result.length > 0
        ? {
            smallest: result[0].minSeries,
            largest: result[0].maxSeries,
          }
        : {
            smallest: null,
            largest: null,
          };
    } catch (error) {
      console.error('Error finding series range:', error);
      throw error;
    }
  }

  async findOne(_id: string) {
    return this.girviRepository.findOne({ _id });
  }

  async findBySeries(series: number) {
    return this.girviRepository.find({ series });
  }

  async update(_id: string, updateGirviInput: UpdateGirviInput) {
    return await this.girviRepository.findOneAndUpdate(
      { _id },
      { $set: { ...updateGirviInput } },
    );
  }

  async remove(_id: string) {
    return this.girviRepository.findOneAndDelete({ _id });
  }

  async saveExcelToTemp(
    // file: Express.Multer.File,
    buffer: any,
    userId: string,
  ): Promise<boolean> {
    // console.log(
    //   'Received file in saveExcelToTemp:',
    //   file,
    //   typeof file,
    //   file.buffer,
    // );
    // const tempPath = join(
    //   __dirname,
    //   '../../temp',
    //   `${Date.now()}-${file.originalname}`,
    // );
    // await new Promise<void>((resolve, reject) => {
    //   createWriteStream(tempPath).write(file.buffer, (error) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve();
    //     }
    //   });
    // });
    // return true;
    const tempDir = join(__dirname, '../../temp');
    if (!existsSync(tempDir)) {
      mkdirSync(tempDir, { recursive: true });
    }
    const tempPath = join(tempDir, `${Date.now()}-upload.xlsx`);
    await new Promise<void>((resolve, reject) => {
      createWriteStream(tempPath).write(buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
    await this.addExcelProcessingJob(tempPath, userId);
    return true;
  }

  async addExcelProcessingJob(filePath: string, userId: string) {
    // Directly call handleParseExcel instead of adding to queue
    await this.handleParseExcel(filePath, userId);
  }

  // @Process('parse-excel') // Commented out BullMQ Process decorator
  async handleParseExcel(filePath: string, userId: string) {
    // Modified to accept filePath and userId directly
    console.log(`Processing Excel file: ${filePath} for user: ${userId}`);
    console.log(`Processing Excel file: ${filePath} for user: ${userId}`);

    // Helper to convert Excel serial date to DD--MM--YYYY string
    function excelDateToJSDate(serial: number): string {
      const utc_days = Math.floor(serial - 25569);
      const utc_value = utc_days * 86400;
      const date_info = new Date(utc_value * 1000);
      const day = String(date_info.getUTCDate()).padStart(2, '0');
      const month = String(date_info.getUTCMonth() + 1).padStart(2, '0');
      const year = date_info.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }

    function parseDateField(date: any): string {
      if (!date) return null;
      if (typeof date === 'number') {
        // Excel serial date
        const utc_days = Math.floor(date - 25569);
        const utc_value = utc_days * 86400;
        const date_info = new Date(utc_value * 1000);
        return date_info.toISOString();
      }
      if (typeof date === 'string') {
        // Try to parse DD/MM/YYYY or ISO
        if (date.includes('/')) {
          const [day, month, year] = date.split('/').map(Number);
          return new Date(year, month - 1, day).toISOString();
        }
        // If already ISO string
        return new Date(date).toISOString();
      }
      if (date instanceof Date) {
        return date.toISOString();
      }
      return null;
    }
    function calculateSeries(number: number): number {
      if (number < 1000 || number > 9999) {
        throw new Error('Number must be a 4-digit number.');
      }
      const series = Math.floor((number - 1) / 100);
      return series;
    }

    try {
      const workbook = XLSX.read(readFileSync(filePath), { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelRows = XLSX.utils.sheet_to_json(worksheet);

      const girviEntities: CreateGirviInput[] = [];

      for (const row of excelRows) {
        // Convert Excel serial date to string if needed
        let startDate = parseDateField(row['start date']);
        let endDate = parseDateField(row['end date']);
        const girviItem: GirviItem = {
          amtLoan: row['amount_loan'],
          FullDescription: row['item'],
          grossWt: row['gross weight'],
          Value: row['value'],
        };

        const girviInput: CreateGirviInput = {
          // userId: userId,
          number: row['itemno'],
          NameAddress: row['name'],
          date: startDate ? new Date(startDate) : null,
          endDate: endDate ? new Date(endDate) : null,
          GirviItems: [girviItem],
          series: calculateSeries(row['itemno']),
        };
        girviEntities.push(girviInput);
      }

      for (const girviInput of girviEntities) {
        await this.create(girviInput, userId);
      }

      console.log(
        `Successfully processed and saved ${girviEntities.length} Girvi entities.`,
      );
    } catch (error) {
      console.error(`Failed to process Excel file ${filePath}:`, error);
      throw error;
    }
  }
}
