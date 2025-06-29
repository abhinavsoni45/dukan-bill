import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExcelImporterService } from './excel-importer.service';
import { ExcelImporter } from './entities/excel-importer.entity';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { extname } from 'path';
import { CreateExcelImporterInput } from './dto/create-excel-importer.input';
import { UpdateExcelImporterInput } from './dto/update-excel-importer.input';

@Resolver(() => ExcelImporter)
export class ExcelImporterResolver {
  constructor(private readonly excelImporterService: ExcelImporterService) {}

  @Mutation(() => ExcelImporter)
  createExcelImporter(
    @Args('createExcelImporterInput')
    createExcelImporterInput: CreateExcelImporterInput,
  ) {
    return this.excelImporterService.create(createExcelImporterInput);
  }
  // @Mutation(() => Boolean)
  // async uploadExcelFile(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  // ): Promise<boolean> {
  //   const { createReadStream, filename } = file;
  //   const newFilename = `${Date.now()}${extname(filename)}`;
  //   const filePath = `./temp/${newFilename}`;

  //   return new Promise((resolve, reject) => {
  //     createReadStream()
  //       .pipe(createWriteStream(filePath))
  //       .on('finish', async () => {
  //         await this.excelImporterService.queueExcelFile(filePath);
  //         resolve(true);
  //       })
  //       .on('error', () => reject(false));
  //   });
  // }

  @Query(() => [ExcelImporter], { name: 'excelImporter' })
  findAll() {
    return this.excelImporterService.findAll();
  }

  @Query(() => ExcelImporter, { name: 'excelImporter' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.excelImporterService.findOne(id);
  }

  @Mutation(() => ExcelImporter)
  updateExcelImporter(
    @Args('updateExcelImporterInput')
    updateExcelImporterInput: UpdateExcelImporterInput,
  ) {
    return this.excelImporterService.update(
      updateExcelImporterInput.id,
      updateExcelImporterInput,
    );
  }

  @Mutation(() => ExcelImporter)
  removeExcelImporter(@Args('id', { type: () => Int }) id: number) {
    return this.excelImporterService.remove(id);
  }
}
