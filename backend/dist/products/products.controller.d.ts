import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '../users/entities/user.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, req: {
        user: User;
    }): Promise<import("./entities/product.entity").Product>;
    findAll(req: {
        user: User;
    }): Promise<import("./entities/product.entity").Product[]>;
    findOne(id: number, req: {
        user: User;
    }): Promise<import("./entities/product.entity").Product>;
    remove(id: number, req: {
        user: User;
    }): Promise<import("./entities/product.entity").Product>;
    update(id: number, updateProductDto: UpdateProductDto, req: {
        user: User;
    }): Promise<import("./entities/product.entity").Product>;
}
