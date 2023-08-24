import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class RegisterReqDto {
  @ApiProperty()
  @Expose()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @Expose()
  @IsString()
  public userName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  public password: string;

  constructor(partial: Partial<RegisterReqDto>) {
    Object.assign(this, partial);
  }
}

export class LoginReqDto {
  @ApiProperty()
  @Expose()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @Expose()
  @IsString()
  public password: string;

  constructor(partial: Partial<LoginReqDto>) {
    Object.assign(this, partial);
  }
}

export class LoginReqWithGoogleDto {
  @ApiProperty()
  @Expose()
  @IsString()
  public idToken: string;

  constructor(partial: Partial<LoginReqWithGoogleDto>) {
    Object.assign(this, partial);
  }
}
