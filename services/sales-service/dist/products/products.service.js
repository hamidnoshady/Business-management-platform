"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async create(createProductDto, tenantId) {
        const product = this.productsRepository.create({ ...createProductDto, tenantId });
        return this.productsRepository.save(product);
    }
    async findAll(tenantId) {
        return this.productsRepository.find({ where: { tenantId } });
    }
    async findOne(id, tenantId) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException(`محصول با شناسه ${id} یافت نشد.`);
        if (product.tenantId !== tenantId)
            throw new common_1.ForbiddenException('دسترسی به این منبع مجاز نیست.');
        return product;
    }
    async update(id, updateProductDto, tenantId) {
        const product = await this.findOne(id, tenantId);
        const updated = this.productsRepository.merge(product, updateProductDto);
        return this.productsRepository.save(updated);
    }
    async remove(id, tenantId) {
        const product = await this.findOne(id, tenantId);
        await this.productsRepository.remove(product);
    }
    async findProductsByIds(ids, tenantId) {
        const products = await this.productsRepository.findByIds(ids);
        if (products.some(p => p.tenantId !== tenantId)) {
            throw new common_1.ForbiddenException('دسترسی به برخی از محصولات مجاز نیست.');
        }
        return products;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map