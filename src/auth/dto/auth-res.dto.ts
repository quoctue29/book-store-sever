import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AccessToken } from '../interface';
import { UserInfoDto } from '@/users/dto';

export class AuthResDto {
  @ApiProperty()
  @Expose()
  public accessToken: AccessToken;

  @ApiProperty()
  @Expose()
  public user: UserInfoDto;

  constructor(partial: Partial<AuthResDto>) {
    Object.assign(this, partial);
  }
}
