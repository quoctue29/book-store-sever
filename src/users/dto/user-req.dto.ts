import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Role, ServerMessage } from '../../common';

export class SetRoleDto {
  @ApiProperty()
  @IsArray()
  @IsEnum(Role, { each: true, message: ServerMessage.INVALID_ENUM_VALUE })
  @IsNotEmpty()
  public roles: Role[];

  constructor(partial: Partial<SetRoleDto>) {
    Object.assign(this, partial);
  }
}

export class UpdateUserInfoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public fullName: string;

  @ApiProperty()
  @IsNumberString({ no_symbols: true }, { message: 'Invalid phone number' })
  @Length(10, 11, { message: 'Phone number must be between 10 and 11 digits' })
  @IsNotEmpty()
  public phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public avatar: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public address: string;

  constructor(partial: Partial<UpdateUserInfoDto>) {
    Object.assign(this, partial);
  }
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Old password must be at least 8 characters' })
  @IsNotEmpty()
  public oldPassWord: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'New password must be at least 8 characters' })
  @IsNotEmpty()
  public newPassWord: string;
}
