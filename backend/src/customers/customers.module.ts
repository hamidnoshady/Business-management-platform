import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from 'src/customers/customers.controller';
import { CustomersService } from 'src/customers/customers.service';
import { Customer } from 'src/customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer], 'crm')],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
