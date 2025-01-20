import { CreateBillInput } from './create-bill.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBillInput extends PartialType(CreateBillInput) {
  @Field(() => String)
  _id: string;
  // @Field()
  // __typename: string;
  // @Field()
  // userId: string;
}
