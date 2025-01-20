import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateItemInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  hsnCode?: string;

  @Field()
  @IsString()
  products: string;

  @Field(() => Float)
  @IsNumber()
  grossWt: number;

  @Field(() => Float)
  @IsNumber()
  netWt: number;

  @Field(() => Float)
  @IsNumber()
  ratePerUnit: number;

  @Field(() => Float)
  @IsNumber()
  amountRs: number;
}

@InputType()
export class CreateBillInput {
  @Field(() => Int)
  @IsNumber()
  number: number;

  @Field()
  @IsString()
  customerName: string;

  @Field()
  @IsString()
  date: string;

  @Field(() => Float)
  @IsNumber()
  taxableValue: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  cgst?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  sgst?: number;

  @Field(() => Float)
  @IsNumber()
  invoiceTotal: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  chequeNo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bankName?: string;

  @Field(() => [CreateItemInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInput)
  AllItems: CreateItemInput[];
}
