import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '@app/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد محصول جدید' })
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productsService.create(createProductDto, req.user.tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست محصولات' })
  findAll(@Request() req) {
    return this.productsService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت یک محصول خاص' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.productsService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'به‌روزرسانی یک محصول' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto, @Request() req) {
    return this.productsService.update(id, updateProductDto, req.user.tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف یک محصول' })
  async remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    await this.productsService.remove(id, req.user.tenantId);
    return { message: 'محصول با موفقیت حذف شد.' };
  }
}
