import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsBoolean,
  IsEnum,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Role } from '../../common';

export class UserInfoDto {
  @ApiProperty()
  @Expose()
  @IsString()
  uid?: any;

  @ApiProperty()
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Expose()
  @IsString()
  userName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  fullName?: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  phone?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  address?: string;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  isVerifiedEmail: boolean;

  @ApiProperty()
  @Expose()
  @IsEnum(Role)
  roles: Role[];

  @ApiProperty()
  @Expose()
  @IsNumber()
  authVersion: number;

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

  constructor(partial: Partial<UserInfoDto>) {
    Object.assign(this, partial);
  }
}
