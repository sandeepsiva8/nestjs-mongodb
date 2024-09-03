import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RateLimitService } from '../cache/rate-limit.service';
import { TooManyRequestsException } from '../exceptions/too-many-requests.exception';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RateLimitMiddleware.name);

  constructor(private readonly rateLimitService: RateLimitService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    try {
      const ip = req.ip; // Get client IP address
      this.logger.log(`Request from IP: ${ip}`);
      this.rateLimitService.trackRequest(ip); // Track the request
      next(); // Allow the request to proceed
    } catch (error) {
      if (error instanceof TooManyRequestsException) {
        this.logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
          statusCode: 429,
          message: error.message,
        });
      } else {
        next(error);
      }
    }
  }
}
