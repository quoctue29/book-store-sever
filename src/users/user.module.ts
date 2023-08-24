import { Module } from '@nestjs/common';
import { RepositoryModule } from '@/repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
