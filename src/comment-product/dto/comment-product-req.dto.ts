import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsMongoId } from 'class-validator';

export class CreateCommentProductDto {
  @ApiProperty()
  @Expose()
  @IsString()
  comment: string;

  @ApiProperty()
  @Expose()
  @IsMongoId()
  productId: string;

  constructor(partial: Partial<CreateCommentProductDto>) {
    Object.assign(this, partial);
  }
}

export class UpdateCommentProductDto {
  @ApiProperty()
  @Expose()
  @IsString()
  comment: string;

  constructor(partial: Partial<UpdateCommentProductDto>) {
    Object.assign(this, partial);
  }
}
