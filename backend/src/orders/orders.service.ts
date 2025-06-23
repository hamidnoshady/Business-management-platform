import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
