import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('order_items')
export class OrderItem {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  productId: string;

  @ApiProperty()
  @Column()
  productName: string; // برای دسترسی سریع‌تر، نام محصول کپی می‌شود

  @ApiProperty()
  @Column('int')
  quantity: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number; // قیمت در زمان خرید
  
  @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
  order: Order;
}