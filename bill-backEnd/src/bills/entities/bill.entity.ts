import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
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

  @Field(() => Float)
  @Prop()
  grossWt: number;

  @Field(() => Float)
  @Prop()
  netWt: number;

  @Field(() => Float)
  @Prop()
  ratePerUnit: number;

  @Field(() => Float)
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

  @Field(() => Float)
  @Prop()
  taxableValue: number;

  @Field(() => Float, { nullable: true })
  @Prop()
  cgst?: number;

  @Field(() => Float, { nullable: true })
  @Prop()
  sgst?: number;

  @Field(() => Float)
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
