import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '@app/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) 
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد یک مشتری جدید' })
  create(@Body() createCustomerDto: CreateCustomerDto, @Request() req) {
    const { tenantId } = req.user; // tenantId از توکن JWT استخراج می‌شود
    return this.customersService.create(createCustomerDto, tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست تمام مشتریان مستأجر فعلی' })
  findAll(@Request() req) {
    const { tenantId } = req.user;
    return this.customersService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت اطلاعات یک مشتری خاص' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const { tenantId } = req.user;
    return this.customersService.findOne(id, tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'به‌روزرسانی اطلاعات یک مشتری' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCustomerDto: UpdateCustomerDto, @Request() req) {
    const { tenantId } = req.user;
    return this.customersService.update(id, updateCustomerDto, tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف یک مشتری' })
  @ApiResponse({ status: 200, description: 'مشتری با موفقیت حذف شد.' })
  async remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const { tenantId } = req.user;
    await this.customersService.remove(id, tenantId);
    return { message: 'مشتری با موفقیت حذف شد.' };
  }
}
