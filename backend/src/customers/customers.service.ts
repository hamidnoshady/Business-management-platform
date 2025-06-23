import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer, 'crm')
    private customersRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }
}
