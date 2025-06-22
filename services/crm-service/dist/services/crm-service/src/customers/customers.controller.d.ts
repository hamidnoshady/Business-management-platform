import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto, req: any): Promise<import("./entities/customer.entity").Customer>;
    findAll(req: any): Promise<import("./entities/customer.entity").Customer[]>;
    findOne(id: string, req: any): Promise<import("./entities/customer.entity").Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto, req: any): Promise<import("./entities/customer.entity").Customer>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
