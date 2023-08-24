import { PaginationQuery, SortEnum } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CartQuery extends PaginationQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public email?: string;

  @ApiProperty({ required: false, default: -1 })
  @IsOptional()
  public sortCreatedAt?: SortEnum;
}
