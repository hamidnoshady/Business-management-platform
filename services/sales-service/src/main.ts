import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Sales Service API')
    .setDescription('مستندات API برای سرویس مدیریت فروش، محصولات و سفارشات')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3003); 
  console.log(`Sales Service is running on: ${await app.getUrl()}`);
}
bootstrap();
