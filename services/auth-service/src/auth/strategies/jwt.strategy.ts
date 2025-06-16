
// ================================================================
// file: services/auth-service/src/auth/strategies/jwt.strategy.ts
// توضیحات: استراتژی Passport برای اعتبارسنجی JWT
// ================================================================
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string, email: string, tenantId: string, role: string }) {
    // این متد پس از موفقیت‌آمیز بودن اعتبارسنجی توکن اجرا می‌شود
    // می‌توانید در اینجا اطلاعات کاربر را از دیتابیس بگیرید
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
        throw new UnauthorizedException('کاربر نامعتبر است');
    }
    // مقداری که از این متد بازگردانده می‌شود، در req.user قرار می‌گیرد
    // ما فیلد هش پسورد را حذف می‌کنیم تا به بیرون درز نکند
    const { passwordHash, ...result } = user;
    return result;
  }
}
