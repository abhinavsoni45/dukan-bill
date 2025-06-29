import { ObjectType, Field, Int } from '@nestjs/graphql';
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

  @Field(() => Int)
  @Prop()
  number: number;

  @Field()
  @Prop()
  NameAddress: string;

  @Field()
  @Prop()
  date: string;

  @Field(() => Int, { nullable: true })
  @Prop()
  phno?: number;

  @Field()
  @Prop()
  intDue: boolean;

  @Field(() => [GirviItem])
  @Prop({ type: [GirviItemSchema] })
  GirviItems: GirviItem[];
}

export const GirviSchema = SchemaFactory.createForClass(Girvi);
