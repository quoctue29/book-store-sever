import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';

export class AuthorResDto {
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string;

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

  constructor(partial: Partial<AuthorResDto>) {
    Object.assign(this, partial);
  }
}
