import { Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
export declare class CustomersService {
    private customersRepository;
    constructor(customersRepository: Repository<Customer>);
    findAll(): Promise<Customer[]>;
}
