import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AuthorReqDto {
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string;

  constructor(partial: Partial<AuthorReqDto>) {
    Object.assign(this, partial);
  }
}
