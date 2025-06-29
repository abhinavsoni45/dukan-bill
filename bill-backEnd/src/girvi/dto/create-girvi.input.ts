import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateGitemInput {
  @Field(() => Float)
  @IsNumber()
  principal: number;

  @Field()
  @IsString()
  amtLoan: string;

  @Field()
  @IsString()
  No: string;

  @Field()
  @IsString()
  FullDescription: string;

  @Field(() => Float)
  @IsNumber()
  grossWt: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  gms?: number;

  @Field()
  @IsString()
  Value: string;
}

@InputType()
export class CreateGirviInput {
  @Field(() => Int)
  @IsNumber()
  number: number;

  @Field()
  @IsString()
  NameAddress: string;

  @Field()
  @IsString()
  date: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  phno?: number;

  @Field(() => Int)
  @IsNumber()
  intDue: boolean;

  @Field(() => Int)
  TotalAmt: number;

  @Field(() => [CreateGitemInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGitemInput)
  GirviItems: CreateGitemInput[];
}
