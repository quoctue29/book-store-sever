import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { ServerMessage, TypeCategory } from '@/common';

export class SetCategoryDto {
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsEnum(TypeCategory, { message: ServerMessage.INVALID_ENUM_VALUE })
  type: TypeCategory;

  constructor(partial: Partial<SetCategoryDto>) {
    Object.assign(this, partial);
  }
}
