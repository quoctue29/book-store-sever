import { NationEnum, ProvinceCityEnum, statusOrder } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsString } from 'class-validator';

export class OrderResDto {
  constructor(partial: Partial<OrderResDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Expose()
  @IsString()
  recipientName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  email: string;

  @ApiProperty()
  @Expose()
  @IsString()
  phone: string;

  @ApiProperty()
  @Expose()
  @IsEnum(NationEnum)
  nation: NationEnum;

  @ApiProperty()
  @Expose()
  @IsEnum(ProvinceCityEnum)
  provinceCity: ProvinceCityEnum;

  @ApiProperty()
  @Expose()
  @IsString()
  district: string;

  @ApiProperty()
  @Expose()
  @IsString()
  wards: string;

  @ApiProperty()
  @Expose()
  @IsString()
  address: string;

  @ApiProperty()
  @Expose()
  @IsEnum(statusOrder)
  isConfirm: statusOrder;

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
}
