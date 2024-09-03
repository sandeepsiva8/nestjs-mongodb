import { Injectable, BadRequestException } from '@nestjs/common';
import * as NodeCache from 'node-cache';

@Injectable()
export class RateLimitService {
  private readonly cache: NodeCache;
  private readonly limit: number; // Number of allowed requests
  private readonly ttl: number; // Time to live for each cache entry in seconds

  constructor() {
    this.limit = 10; // Number of allowed requests
    this.ttl = 60; // Time window in seconds
    this.cache = new NodeCache({ stdTTL: this.ttl, checkperiod: this.ttl / 2 });
  }

  /**
   * Tracks the number of requests made by a given IP address.
   * Throws an exception if the request limit is exceeded.
   * @param ip - The IP address of the client making the request.
   */
  trackRequest(ip: string): void {
    // Get the current request count for the IP address
    const requestCount = this.cache.get<number>(ip) || 0;

    // If the request count exceeds the limit, throw an exception
    if (requestCount >= this.limit) {
      throw new BadRequestException(
        `Too many requests from IP ${ip}. Please try again in ${this.ttl} seconds.`
      );
    }

    // Increment the request count and update the cache
    this.cache.set(ip, requestCount + 1, this.ttl);
  }
}
