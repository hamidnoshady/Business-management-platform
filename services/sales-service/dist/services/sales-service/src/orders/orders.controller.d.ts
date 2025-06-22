import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, req: any): Promise<import("./entities/order.entity").Order>;
    findAll(req: any): Promise<import("./entities/order.entity").Order[]>;
    findOne(id: string, req: any): Promise<import("./entities/order.entity").Order>;
}
