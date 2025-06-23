import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { User } from 'src/users/entities/user.entity';
import { Tenant } from 'src/tenants/entities/tenant.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { Customer } from 'src/customers/entities/customer.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      name: 'auth',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST_AUTH'),
        port: configService.get<number>('DATABASE_PORT_AUTH'),
        username: configService.get<string>('DATABASE_USER_AUTH'),
        password: configService.get<string>('DATABASE_PASSWORD_AUTH'),
        database: configService.get<string>('DATABASE_NAME_AUTH'),
        entities: [User, Tenant],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'crm',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST_CRM'),
        port: configService.get<number>('DATABASE_PORT_CRM'),
        username: configService.get<string>('DATABASE_USER_CRM'),
        password: configService.get<string>('DATABASE_PASSWORD_CRM'),
        database: configService.get<string>('DATABASE_NAME_CRM'),
        entities: [Customer],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'sales',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST_SALES'),
        port: configService.get<number>('DATABASE_PORT_SALES'),
        username: configService.get<string>('DATABASE_USER_SALES'),
        password: configService.get<string>('DATABASE_PASSWORD_SALES'),
        database: configService.get<string>('DATABASE_NAME_SALES'),
        entities: [Product, Order, OrderItem],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    TenantsModule,
    CustomersModule,
    OrdersModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
