import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';

export class WarehouseResDto {
  @ApiProperty()
  @Expose()
  @IsString()
  productId: string;

  @ApiProperty()
  @Expose()
  @IsString()
  amount: number;

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

  constructor(partial: Partial<WarehouseResDto>) {
    Object.assign(this, partial);
  }
}
