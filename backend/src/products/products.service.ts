import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product, 'sales')
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto, user: User) {
    const newProduct = this.productsRepository.create({
      ...createProductDto,
      tenantId: user.tenant.id,
    });
    return this.productsRepository.save(newProduct);
  }

  findAllForTenant(user: User) {
    return this.productsRepository.find({
      where: { tenantId: user.tenant.id },
    });
  }

  async findOne(id: number, user: User) {
    const product = await this.productsRepository.findOne({ where: { id, tenantId: user.tenant.id } });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async remove(id: number, user: User) {
    const product = await this.findOne(id, user);
    return this.productsRepository.remove(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto, user: User) {
    const product = await this.findOne(id, user);
    this.productsRepository.merge(product, updateProductDto);
    return this.productsRepository.save(product);
  }
}
