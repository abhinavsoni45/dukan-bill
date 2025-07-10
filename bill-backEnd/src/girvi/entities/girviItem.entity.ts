import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType('GirviItem')
export class GirviItem {
  @Field()
  @Prop()
  amtLoan: string;

  @Field()
  @Prop()
  No?: string;

  @Field()
  @Prop()
  FullDescription: string;

  @Field(() => Float)
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
