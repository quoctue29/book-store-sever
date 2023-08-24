import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getKey(key: string) {
    return `KEY-${key}`;
  }
  async get(key: string) {
    return await this.cacheManager.get(key);
  }
  async set(key: string, value: unknown, ttl = 0) {
    await this.cacheManager.set(key, value, ttl);
  }
  async delete(key: string) {
    await this.cacheManager.del(key);
  }
  async reset() {
    await this.cacheManager.reset();
  }
}
