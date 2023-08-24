import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQuery } from '../../common';
import { SortEnum } from '../../common';

export class UserQuery extends PaginationQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public userName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public fullName?: string;

  @ApiProperty({ required: false, default: -1 })
  @IsOptional()
  public sortCreatedAt?: SortEnum;
}
