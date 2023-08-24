import { SetMetadata } from '@nestjs/common';

export const CacheKey = (cacheKeyValue: any) =>
  SetMetadata('cache-key', cacheKeyValue);
