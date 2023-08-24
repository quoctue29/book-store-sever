import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsDate, IsEnum, IsNumber } from 'class-validator';

export class ProductResDto {
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string;

  @ApiProperty()
  @Expose()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  price: number;

  @ApiProperty()
  @Expose()
  @IsString()
  provider: string;

  @ApiProperty()
  @Expose()
  @IsString()
  publishingCompany: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  publishingYear: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @Expose()
  @IsString()
  followers: string;

  @ApiProperty()
  @Expose()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  authorId: string;

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

  constructor(partial: Partial<ProductResDto>) {
    Object.assign(this, partial);
  }
}
