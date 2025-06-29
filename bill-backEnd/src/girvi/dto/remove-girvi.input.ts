import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class RemoveGirviInput {
  @Field()
  @IsString()
  _id: string;
}
