import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { CachingService } from './caching.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        ttl: configService.get<number>('CACHE_TTL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CachingService],
  exports: [CacheModule, CachingService],
})
export class CachingModule {}
