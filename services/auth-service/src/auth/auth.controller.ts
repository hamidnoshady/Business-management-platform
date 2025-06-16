import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { RolesGuard } from './guards/roles.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'ثبت نام کاربر جدید و ایجاد مستأجر' })
  @ApiResponse({ status: 201, description: 'کاربر با موفقیت ایجاد شد و توکن بازگردانده شد.'})
  @ApiResponse({ status: 409, description: 'کاربر یا زیردامنه تکراری است.'})
  register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'ورود کاربر به سیستم' })
  @ApiResponse({ status: 200, description: 'ورود موفقیت آمیز، توکن بازگردانده شد.'})
  @ApiResponse({ status: 401, description: 'ایمیل یا رمز عبور نامعتبر.'})
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard) 
  @Get('profile')
  @ApiOperation({ summary: 'دریافت اطلاعات پروفایل کاربر لاگین کرده' })
  getProfile(@Request() req) {

    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN) 
  @Get('admin-area')
  @ApiOperation({ summary: 'یک روت محافظت شده فقط برای ادمین‌ها' })
  getAdminData(@Request() req) {
    return { message: 'به بخش ادمین خوش آمدید', user: req.user };
  }
}
