"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const tenants_module_1 = require("./tenants/tenants.module");
const user_entity_1 = require("./users/entities/user.entity");
const tenant_entity_1 = require("./tenants/entities/tenant.entity");
const customers_module_1 = require("./customers/customers.module");
const customer_entity_1 = require("./customers/entities/customer.entity");
const orders_module_1 = require("./orders/orders.module");
const products_module_1 = require("./products/products.module");
const product_entity_1 = require("./products/entities/product.entity");
const order_entity_1 = require("./orders/entities/order.entity");
const order_item_entity_1 = require("./orders/entities/order-item.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                name: 'auth',
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST_AUTH'),
                    port: configService.get('DATABASE_PORT_AUTH'),
                    username: configService.get('DATABASE_USER_AUTH'),
                    password: configService.get('DATABASE_PASSWORD_AUTH'),
                    database: configService.get('DATABASE_NAME_AUTH'),
                    entities: [user_entity_1.User, tenant_entity_1.Tenant],
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                name: 'crm',
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST_CRM'),
                    port: configService.get('DATABASE_PORT_CRM'),
                    username: configService.get('DATABASE_USER_CRM'),
                    password: configService.get('DATABASE_PASSWORD_CRM'),
                    database: configService.get('DATABASE_NAME_CRM'),
                    entities: [customer_entity_1.Customer],
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                name: 'sales',
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST_SALES'),
                    port: configService.get('DATABASE_PORT_SALES'),
                    username: configService.get('DATABASE_USER_SALES'),
                    password: configService.get('DATABASE_PASSWORD_SALES'),
                    database: configService.get('DATABASE_NAME_SALES'),
                    entities: [product_entity_1.Product, order_entity_1.Order, order_item_entity_1.OrderItem],
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            tenants_module_1.TenantsModule,
            customers_module_1.CustomersModule,
            orders_module_1.OrdersModule,
            products_module_1.ProductsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map