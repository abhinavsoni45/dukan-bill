import { CreateGirviInput } from './create-girvi.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGirviInput extends PartialType(CreateGirviInput) {
  @Field(() => String)
  _id: string;
}
