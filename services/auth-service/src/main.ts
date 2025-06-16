
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // فعال‌سازی اعتبارسنجی سراسری برای تمام ورودی‌ها
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // حذف فیلدهای اضافی از DTO
    forbidNonWhitelisted: true, // ارسال خطا در صورت وجود فیلد اضافی
    transform: true, // تبدیل اتوماتیک انواع داده‌ها
  }));
  
  // فعال‌سازی CORS برای ارتباط با فرانت‌اند
  app.enableCors();

  // تنظیمات مستندات API با Swagger (OpenAPI)
  const config = new DocumentBuilder()
    .setTitle('Auth Service API')
    .setDescription('مستندات API برای سرویس احراز هویت و مدیریت کاربران')
    .setVersion('1.0')
    .addBearerAuth() // افزودن دکمه Authorize برای تست JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3001); // این سرویس روی پورت 3001 اجرا می‌شود
  console.log(`Auth Service is running on: ${await app.getUrl()}`);
}
bootstrap();









