import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema({ collection: 'inventory_items', timestamps: true })
@ObjectType()
export class InventoryItem extends Document {
  @Field(() => String)
  _id: Types.ObjectId;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  group: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  category: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  itemName: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  name: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  barcode: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  totalWeight: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  netWeight: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  purity: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  wastage: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  labourRate: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  extraRs: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  fineWt: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  size: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  huid: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  huidCharge: string;

  @Prop({ type: String, required: false })
  @Field({ nullable: true })
  mrp: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const InventoryItemSchema = SchemaFactory.createForClass(InventoryItem);