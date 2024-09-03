export declare class CacheService {
    private cache;
    constructor();
    get<T>(key: string): T;
    set<T>(key: string, value: T, ttl?: number): void;
    del(key: string): void;
    flush(): void;
}
