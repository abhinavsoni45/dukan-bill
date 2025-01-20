import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class RemoveBillInput {
  @Field()
  @IsString()
  _id: string;
}
