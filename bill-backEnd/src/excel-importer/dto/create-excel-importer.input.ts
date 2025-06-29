import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExcelImporterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
