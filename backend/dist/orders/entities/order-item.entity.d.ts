import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';
export declare class OrderItem {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    price: number;
}
