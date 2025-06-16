
// ================================================================
// file: services/auth-service/src/auth/auth.service.ts
// توضیحات: سرویس اصلی برای منطق احراز هویت
// ================================================================
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { TenantsService } from '../tenants/tenants.service';
import { User, UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tenantsService: TenantsService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterUserDto): Promise<{ accessToken: string }> {
    const { email, password, tenantName, tenantSubdomain } = registerDto;
    
    // ۱. بررسی تکراری نبودن کاربر
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('کاربری با این ایمیل قبلا ثبت نام کرده است');
    }

    // ۲. ایجاد مستأجر جدید
    const newTenant = await this.tenantsService.create({ 
        name: tenantName, 
        subdomain: tenantSubdomain 
    });

    // ۳. ایجاد کاربر ادمین برای مستأجر جدید
    const newUser = await this.usersService.create({
      email,
      passwordHash: password, // هش کردن در داخل entity انجام می‌شود
      tenantId: newTenant.id,
      role: UserRole.ADMIN, // اولین کاربر، ادمین مستأجر است
    });

    // ۴. ایجاد و بازگرداندن توکن
    const payload = { sub: newUser.id, email: newUser.email, tenantId: newUser.tenantId, role: newUser.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('ایمیل یا رمز عبور نامعتبر است');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('ایمیل یا رمز عبور نامعتبر است');
    }

    const payload = { sub: user.id, email: user.email, tenantId: user.tenantId, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
