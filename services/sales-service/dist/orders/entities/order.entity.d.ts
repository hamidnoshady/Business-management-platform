import { OrderItem } from './order-item.entity';
export declare enum OrderStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Order {
    id: string;
    customerId: string;
    status: OrderStatus;
    totalAmount: number;
    tenantId: string;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
