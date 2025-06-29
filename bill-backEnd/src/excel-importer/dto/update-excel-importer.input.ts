import { CreateExcelImporterInput } from './create-excel-importer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExcelImporterInput extends PartialType(CreateExcelImporterInput) {
  @Field(() => Int)
  id: number;
}
