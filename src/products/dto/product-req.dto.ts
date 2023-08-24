import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ProductReqDto {
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
  @IsNumber()
  discount: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  publishingYear: number;

  @ApiProperty()
  @Expose()
  @IsString()
  publishingCompany: string;

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
  @IsString()
  authorId: string;

  constructor(partial: Partial<ProductReqDto>) {
    Object.assign(this, partial);
  }
}
