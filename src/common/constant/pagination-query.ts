import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQuery {
  @ApiProperty({ required: false, default: 1, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page? = 1;

  @ApiProperty({ required: false, default: 20, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit? = 20;
}
