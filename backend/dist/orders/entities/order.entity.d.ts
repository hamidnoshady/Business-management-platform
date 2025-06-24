import { OrderItem } from '@/orders/entities/order-item.entity';
export declare class Order {
    id: number;
    customer_id: number;
    order_date: Date;
    items: OrderItem[];
}
