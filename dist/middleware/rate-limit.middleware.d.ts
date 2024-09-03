import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RateLimitService } from '../cache/rate-limit.service';
export declare class RateLimitMiddleware implements NestMiddleware {
    private readonly rateLimitService;
    private readonly logger;
    constructor(rateLimitService: RateLimitService);
    use(req: Request, res: Response, next: NextFunction): void;
}
