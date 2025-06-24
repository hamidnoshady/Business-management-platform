import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Order } from './entities/order.entity';
export declare class OrdersService {
    private ordersRepository;
    constructor(ordersRepository: Repository<Order>);
    findAll(): Promise<Order[]>;
    findOneWithDetails(id: string, user: User): Promise<Order>;
}
