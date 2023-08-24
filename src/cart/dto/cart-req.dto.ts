import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class ListProduct {
  @ApiProperty()
  @Expose()
  @IsMongoId()
  productId: string;

  @ApiProperty({ default: 1, type: Number })
  @Expose()
  @IsNumber()
  amount: 1;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  IsSelected: boolean;
}

export class CartReqDto {
  @ApiProperty({ type: [ListProduct] })
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListProduct)
  @IsOptional()
  productIds?: ListProduct[];

  constructor(partial: Partial<CartReqDto>) {
    Object.assign(this, partial);
  }
}
