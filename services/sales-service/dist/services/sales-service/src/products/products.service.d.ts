import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    create(createProductDto: CreateProductDto, tenantId: string): Promise<Product>;
    findAll(tenantId: string): Promise<Product[]>;
    findOne(id: string, tenantId: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto, tenantId: string): Promise<Product>;
    remove(id: string, tenantId: string): Promise<void>;
    findProductsByIds(ids: string[], tenantId: string): Promise<Product[]>;
}
