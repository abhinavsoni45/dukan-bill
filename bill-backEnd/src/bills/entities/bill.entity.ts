import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@ObjectType()
@Schema()
export class Item {
  @Field({ nullable: true })
  @Prop()
  hsnCode?: string;

  @Field()
  @Prop()
  products: string;

  @Field(() => Int)
  @Prop()
  grossWt: number;

  @Field(() => Int)
  @Prop()
  netWt: number;

  @Field(() => Int)
  @Prop()
  ratePerUnit: number;

  @Field(() => Int)
  @Prop()
  amountRs: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

@ObjectType()
@Schema()
export class Bill extends AbstractEntity {
  @Field()
  @Prop()
  userId: string;

  @Field(() => Int)
  @Prop()
  number: number;

  @Field()
  @Prop()
  customerName: string;

  @Field()
  @Prop()
  date: string;

  @Field(() => Int)
  @Prop()
  taxableValue: number;

  @Field(() => Int, { nullable: true })
  @Prop()
  cgst?: number;

  @Field(() => Int, { nullable: true })
  @Prop()
  sgst?: number;

  @Field(() => Int)
  @Prop()
  invoiceTotal: number;

  @Field({ nullable: true })
  @Prop()
  chequeNo?: string;

  @Field({ nullable: true })
  @Prop()
  bankName?: string;

  @Field(() => [Item])
  @Prop({ type: [ItemSchema] })
  AllItems: Item[];
}

export const BillSchema = SchemaFactory.createForClass(Bill);
