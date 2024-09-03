import { ConfigService } from '@nestjs/config';
declare const Auth0Strategy_base: new (...args: any[]) => any;
export declare class Auth0Strategy extends Auth0Strategy_base {
    constructor(configService: ConfigService);
    validate(req: any, accessToken: any, refreshToken: any, extraParams: any, profile: any, done: any): void;
}
export {};
