import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType('GirviItem')
export class GirviItem {
  @Field(() => Int)
  @Prop()
  principal: number;

  @Field()
  @Prop()
  amtLoan: string;

  @Field()
  @Prop()
  No: string;

  @Field()
  @Prop()
  FullDescription: string;

  @Field(() => Int)
  @Prop()
  grossWt: number;

  @Field(() => Int)
  @Prop()
  gms?: number;

  @Field()
  @Prop()
  Value: string;
}

export const GirviItemSchema = SchemaFactory.createForClass(GirviItem);
