import { Controller, Get, Post, Body, Param, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد سفارش جدید' })
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.ordersService.create(createOrderDto, req.user.tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست سفارشات' })
  findAll(@Request() req) {
    return this.ordersService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت یک سفارش خاص' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.ordersService.findOne(id, req.user.tenantId);
  }
}