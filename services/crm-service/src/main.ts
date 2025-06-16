import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('CRM Service API')
    .setDescription('مستندات API برای سرویس مدیریت ارتباط با مشتریان')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3002); // این سرویس روی پورت 3002 اجرا می‌شود
  console.log(`CRM Service is running on: ${await app.getUrl()}`);
}
bootstrap();