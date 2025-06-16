import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, tenantId: string): Promise<Order> {
    const { customerId, items } = createOrderDto;

    const productIds = items.map(item => item.productId);
    const products = await this.productsService.findProductsByIds(productIds, tenantId);

    if (products.length !== productIds.length) {
      throw new BadRequestException('یک یا چند محصول نامعتبر یا متعلق به این کسب‌وکار نیستند.');
    }
    
    let totalAmount = 0;
    const orderItems: OrderItem[] = items.map(itemDto => {
      const product = products.find(p => p.id === itemDto.productId);
      totalAmount += product.price * itemDto.quantity;
      
      const orderItem = new OrderItem();
      orderItem.productId = product.id;
      orderItem.productName = product.name;
      orderItem.quantity = itemDto.quantity;
      orderItem.price = product.price;
      return orderItem;
    });

    const newOrder = this.ordersRepository.create({
      customerId,
      tenantId,
      totalAmount,
      items: orderItems,
      status: OrderStatus.PENDING,
    });

    return this.ordersRepository.save(newOrder);
  }

  async findAll(tenantId: string): Promise<Order[]> {
    return this.ordersRepository.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`سفارش با شناسه ${id} یافت نشد.`);
    if (order.tenantId !== tenantId) throw new ForbiddenException('دسترسی به این منبع مجاز نیست.');
    return order;
  }
}
