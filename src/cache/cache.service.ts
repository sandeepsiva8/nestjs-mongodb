// src/cache/cache.service.ts
import { Injectable } from '@nestjs/common';
import * as NodeCache from 'node-cache';

@Injectable()
export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // 10-minute TTL, check every 2 minutes
  }

  get<T>(key: string): T {
    return this.cache.get(key);
  }

  set<T>(key: string, value: T, ttl?: number): void {
    this.cache.set(key, value, ttl);
  }

  del(key: string): void {
    this.cache.del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }
}
