import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';

export class CommentProductDto {
  @ApiProperty()
  @Expose()
  @IsString()
  comment: string;

  @ApiProperty()
  @Expose()
  @IsString()
  productId: string;

  @ApiProperty()
  @Expose()
  @IsString()
  userId: string;

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

  constructor(partial: Partial<CommentProductDto>) {
    Object.assign(this, partial);
  }
}
