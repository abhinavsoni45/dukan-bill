import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SeriesRange {
  @Field(() => Int, { nullable: true })
  smallest: number | null;

  @Field(() => Int, { nullable: true })
  largest: number | null;
}
