import { PaginationQuery, SortEnum, TypeCategory } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CategoryQuery extends PaginationQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public type?: TypeCategory;

  @ApiProperty({ required: false, default: -1 })
  @IsOptional()
  public sortCreatedAt?: SortEnum;
}
