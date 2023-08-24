import { NationEnum, ProvinceCityEnum, statusOrder } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumberString, IsString, Matches } from 'class-validator';

export class OrderReqDto {
  constructor(partial: Partial<OrderReqDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Expose()
  @IsString()
  recipientName: string;

  @ApiProperty()
  @Expose()
  @IsNumberString()
  @Matches(/^[0-9]{10}$/, { message: 'Must be phone number' })
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
}

export class updateStatusOrder {
  @ApiProperty()
  @Expose()
  @IsEnum(statusOrder)
  isConfirm: statusOrder;
}
