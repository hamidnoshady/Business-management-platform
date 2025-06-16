import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, req: any): Promise<import("./entities/product.entity").Product>;
    findAll(req: any): Promise<import("./entities/product.entity").Product[]>;
    findOne(id: string, req: any): Promise<import("./entities/product.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto, req: any): Promise<import("./entities/product.entity").Product>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
