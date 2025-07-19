import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class FilterGirvi {
  @Field(() => String, { nullable: true })
  status?: 'yellow' | 'blue';
}

@InputType()
export class SortGirvi {
  @Field(() => String, { nullable: true })
  sortBy?: 'number' | 'amtLoan';
}

@InputType()
export class NumberGirvi {
  @Field(() => Number, { nullable: true })
  number?: number;
}
@InputType()
export class GirviFilterQuery {
  @Field(() => FilterGirvi, { nullable: true })
  filter?: FilterGirvi;

  @Field(() => SortGirvi, { nullable: true })
  sort?: SortGirvi;

  @Field(() => Number, {
    nullable: true,
  })
  number?: number;
}
