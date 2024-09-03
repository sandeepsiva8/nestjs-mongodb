"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RateLimitMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitMiddleware = void 0;
const common_1 = require("@nestjs/common");
const rate_limit_service_1 = require("../cache/rate-limit.service");
const too_many_requests_exception_1 = require("../exceptions/too-many-requests.exception");
let RateLimitMiddleware = RateLimitMiddleware_1 = class RateLimitMiddleware {
    constructor(rateLimitService) {
        this.rateLimitService = rateLimitService;
        this.logger = new common_1.Logger(RateLimitMiddleware_1.name);
    }
    use(req, res, next) {
        try {
            const ip = req.ip;
            this.logger.log(`Request from IP: ${ip}`);
            this.rateLimitService.trackRequest(ip);
            next();
        }
        catch (error) {
            if (error instanceof too_many_requests_exception_1.TooManyRequestsException) {
                this.logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
                res.status(429).json({
                    statusCode: 429,
                    message: error.message,
                });
            }
            else {
                next(error);
            }
        }
    }
};
RateLimitMiddleware = RateLimitMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rate_limit_service_1.RateLimitService])
], RateLimitMiddleware);
exports.RateLimitMiddleware = RateLimitMiddleware;
//# sourceMappingURL=rate-limit.middleware.js.map