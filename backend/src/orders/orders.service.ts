import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order, 'sales')
    private ordersRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOneWithDetails(id: string, user: User): Promise<Order> {
    const { tenantId } = user;
    const queryBuilder = this.ordersRepository.createQueryBuilder('order');

    queryBuilder
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .where('order.id = :id', { id })
      .andWhere('order.tenantId = :tenantId', { tenantId });

    return queryBuilder.getOne();
  }
}
