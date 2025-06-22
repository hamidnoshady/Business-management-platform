import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';
export declare class OrdersService {
    private ordersRepository;
    private productsService;
    constructor(ordersRepository: Repository<Order>, productsService: ProductsService);
    create(createOrderDto: CreateOrderDto, tenantId: string): Promise<Order>;
    findAll(tenantId: string): Promise<Order[]>;
    findOne(id: string, tenantId: string): Promise<Order>;
}
