import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TenantsModule } from './tenants/tenants.module';
import { User } from './users/entities/user.entity';
import { Tenant } from './tenants/entities/tenant.entity';

@Module({
  imports: [
    // ماژول برای مدیریت متغیرهای محیطی
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // در صورت وجود فایل .env را هم می‌خواند
    }),
    // پیکربندی داینامیک TypeORM برای اتصال به دیتابیس
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        // وارد کردن مستقیم Entity ها برای جلوگیری از خطای مسیردهی در داکر
        entities: [User, Tenant],
        synchronize: true, // در محیط توسعه true باشد تا جداول به صورت خودکار ساخته شوند
      }),
    }),
    // ماژول‌های اصلی برنامه
    AuthModule,
    UsersModule,
    TenantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
