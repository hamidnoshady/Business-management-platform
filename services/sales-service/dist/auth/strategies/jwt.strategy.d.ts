import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: {
        sub: string;
        email: string;
        tenantId: string;
        role: string;
    }): Promise<{
        userId: string;
        email: string;
        tenantId: string;
        role: string;
    }>;
}
export {};
