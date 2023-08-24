import { PaginationQuery, SortEnum } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CommentProductQuery extends PaginationQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  productId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ required: false, default: -1 })
  @IsOptional()
  public sortCreatedAt?: SortEnum;
}
