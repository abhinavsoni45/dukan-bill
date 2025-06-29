import { Injectable } from '@nestjs/common';
import { CreateGirviInput } from './dto/create-girvi.input';
import { UpdateGirviInput } from './dto/update-girvi.input';
import { GirviRepository } from './girvi.repository';
// import { FileUpload } from 'graphql-upload/Upload.mjs';
import { join } from 'path';
import { createReadStream } from 'fs';

@Injectable()
export class GirviService {
  constructor(private readonly girviRepository: GirviRepository) {}

  async create(createGirviInput: CreateGirviInput, userId: string) {
    return this.girviRepository.create({
      ...createGirviInput,
      userId,
    });
  }

  async findAll() {
    return this.girviRepository.find({});
  }

  async findOne(_id: string) {
    return this.girviRepository.findOne({ _id });
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

  // async handleExcelUpload(file: FileUpload, userId: string): Promise<boolean> {
  //   const { createReadStream, filename } = file;
  //   const tempPath = join(__dirname, '../../temp', filename);
  //   await new Promise((resolve, reject) => {
  //     createReadStream()
  //       .pipe(createReadStream(tempPath))
  //       .on('finish', resolve)
  //       .on('error', reject);
  //   });
  //   return true;
  // }
}
