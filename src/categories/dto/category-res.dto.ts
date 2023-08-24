import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsDate, IsEnum } from 'class-validator';
import { TypeCategory } from '@/common';

export class CategoryDto {
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsEnum(TypeCategory)
  type: TypeCategory;

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

  constructor(partial: Partial<CategoryDto>) {
    Object.assign(this, partial);
  }
}
