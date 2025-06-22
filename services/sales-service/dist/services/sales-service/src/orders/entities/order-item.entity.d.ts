import { Order } from './order.entity';
export declare class OrderItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    order: Order;
}
