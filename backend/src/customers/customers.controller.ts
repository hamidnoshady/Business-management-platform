import { Controller, Get, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.customersService.findAll();
  }
}
