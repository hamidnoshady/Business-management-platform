import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto, tenantId: string): Promise<Customer> {
    const newCustomer = this.customersRepository.create({
      ...createCustomerDto,
      tenantId, // اطمینان از ثبت مشتری برای مستأجر درست
    });
    return this.customersRepository.save(newCustomer);
  }

  async findAll(tenantId: string): Promise<Customer[]> {
    return this.customersRepository.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string): Promise<Customer> {
    const customer = await this.customersRepository.findOne({ where: { id } });
    
    if (!customer) {
      throw new NotFoundException(`مشتری با شناسه ${id} یافت نشد.`);
    }

    if (customer.tenantId !== tenantId) {
      // این خطا یعنی کاربر سعی در دسترسی به داده‌های مستأجر دیگر دارد
      throw new ForbiddenException('شما اجازه دسترسی به این منبع را ندارید.');
    }
    
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto, tenantId: string): Promise<Customer> {
    const customer = await this.findOne(id, tenantId); // findOne خودش چک امنیتی را انجام می‌دهد
    const updated = this.customersRepository.merge(customer, updateCustomerDto);
    return this.customersRepository.save(updated);
  }

  async remove(id: string, tenantId: string): Promise<void> {
    const customer = await this.findOne(id, tenantId); // findOne خودش چک امنیتی را انجام می‌دهد
    await this.customersRepository.remove(customer);
  }
}
