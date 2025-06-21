import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.entity';
import { AuthModule } from './auth/auth.module'; // ماژول مشترک برای احراز هویت

@Module({
  imports: [
    // ماژول برای مدیریت متغیرهای محیطی
    ConfigModule.forRoot({
      isGlobal: true,
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
        // وارد کردن مستقیم Entity ها
        entities: [Customer],
        synchronize: true,
      }),
    }),
    // ماژول‌های اصلی برنامه
    CustomersModule,
    AuthModule, // برای استفاده از JwtStrategy و Guard
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
