import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from '@/repository';
import { JwtAuthGuard } from './guard';
import { JwtStrategy } from './strategy';
import { FirebaseModule } from '@/firebase';
import { UserModule } from '@/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: `7d`,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    FirebaseModule,
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
