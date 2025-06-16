import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, tenantId: string): Promise<Product> {
    const product = this.productsRepository.create({ ...createProductDto, tenantId });
    return this.productsRepository.save(product);
  }

  async findAll(tenantId: string): Promise<Product[]> {
    return this.productsRepository.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`محصول با شناسه ${id} یافت نشد.`);
    if (product.tenantId !== tenantId) throw new ForbiddenException('دسترسی به این منبع مجاز نیست.');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, tenantId: string): Promise<Product> {
    const product = await this.findOne(id, tenantId);
    const updated = this.productsRepository.merge(product, updateProductDto);
    return this.productsRepository.save(updated);
  }

  async remove(id: string, tenantId: string): Promise<void> {
    const product = await this.findOne(id, tenantId);
    await this.productsRepository.remove(product);
  }

  async findProductsByIds(ids: string[], tenantId: string): Promise<Product[]> {
    const products = await this.productsRepository.findByIds(ids);
    if (products.some(p => p.tenantId !== tenantId)) {
      throw new ForbiddenException('دسترسی به برخی از محصولات مجاز نیست.');
    }
    return products;
  }
}
