import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // در یک میکروسرویس، ما به payload توکن اعتماد می‌کنیم
  // و نیازی به جستجوی مجدد کاربر در دیتابیس نداریم
  async validate(payload: { sub: string, email: string, tenantId: string, role: string }) {
    return { userId: payload.sub, email: payload.email, tenantId: payload.tenantId, role: payload.role };
  }
}