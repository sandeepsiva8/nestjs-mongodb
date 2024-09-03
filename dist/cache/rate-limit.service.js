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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitService = void 0;
const common_1 = require("@nestjs/common");
const NodeCache = require("node-cache");
let RateLimitService = class RateLimitService {
    constructor() {
        this.limit = 10;
        this.ttl = 60;
        this.cache = new NodeCache({ stdTTL: this.ttl, checkperiod: this.ttl / 2 });
    }
    trackRequest(ip) {
        const requestCount = this.cache.get(ip) || 0;
        if (requestCount >= this.limit) {
            throw new common_1.BadRequestException(`Too many requests from IP ${ip}. Please try again in ${this.ttl} seconds.`);
        }
        this.cache.set(ip, requestCount + 1, this.ttl);
    }
};
RateLimitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RateLimitService);
exports.RateLimitService = RateLimitService;
//# sourceMappingURL=rate-limit.service.js.map