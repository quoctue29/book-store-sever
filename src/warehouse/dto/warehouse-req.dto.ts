import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNumber, IsMongoId } from 'class-validator';

export class WarehouseCreateDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsMongoId()
  productId: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  amount: number;

  constructor(partial: Partial<WarehouseCreateDto>) {
    Object.assign(this, partial);
  }
}

export class WarehouseUpdateDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  amount: number;

  constructor(partial: Partial<WarehouseUpdateDto>) {
    Object.assign(this, partial);
  }
}
