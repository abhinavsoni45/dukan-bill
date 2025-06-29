import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ExcelImporter {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
