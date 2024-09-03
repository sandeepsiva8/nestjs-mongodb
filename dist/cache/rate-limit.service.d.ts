export declare class RateLimitService {
    private readonly cache;
    private readonly limit;
    private readonly ttl;
    constructor();
    trackRequest(ip: string): void;
}
