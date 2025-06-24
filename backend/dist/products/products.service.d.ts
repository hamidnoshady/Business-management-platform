import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '../users/entities/user.entity';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    create(createProductDto: CreateProductDto, user: User): Promise<Product>;
    findAllForTenant(user: User): Promise<Product[]>;
    findOne(id: number, user: User): Promise<Product>;
    remove(id: number, user: User): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto, user: User): Promise<Product>;
}
