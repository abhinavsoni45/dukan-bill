import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { GirviItem, GirviItemSchema } from './girviItem.entity';

// GraphQL Type

@ObjectType('Girvi')
@Schema()
export class Girvi extends AbstractEntity {
  @Field({ nullable: true })
  @Prop()
  userId: string;

  @Field(() => Int, { nullable: true })
  @Prop()
  number: number;

  @Field(() => Int, { nullable: true })
  @Prop()
  series: number;

  @Field({ nullable: true })
  @Prop()
  NameAddress: string;

  @Field({ nullable: true })
  @Prop()
  date: string;

  @Field(() => Float, { nullable: true })
  @Prop()
  phno?: number;

  @Field({ nullable: true })
  @Prop()
  intDue?: boolean;

  @Field(() => [GirviItem], { nullable: true })
  @Prop({ type: [GirviItemSchema] })
  GirviItems: GirviItem[];

  @Field({ nullable: true })
  @Prop()
  endDate?: string;

  @Field({ nullable: true })
  @Prop()
  viyaj?: string;
}

export const GirviSchema = SchemaFactory.createForClass(Girvi);
