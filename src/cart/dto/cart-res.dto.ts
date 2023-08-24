import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsDate, IsNumber, IsArray } from 'class-validator';
import { ListProduct } from './cart-req.dto';
import { User } from '@/users/schema/user.schema';

export class CartResDto {
  @ApiProperty()
  @Expose()
  user: User;

  @ApiProperty()
  @Expose()
  @IsString()
  email: string;

  @ApiProperty()
  @Expose()
  @IsArray()
  productIds: ListProduct;

  @ApiProperty()
  @Expose()
  @IsNumber()
  totalProduct: number;

  @ApiProperty()
  @Expose()
  @IsString()
  totalPrice: number;

  @ApiProperty()
  @Expose()
  @IsDate()
  createdAt?: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty()
  @Expose()
  @IsString()
  id?: string;

  constructor(partial: Partial<CartResDto>) {
    Object.assign(this, partial);
  }
}
