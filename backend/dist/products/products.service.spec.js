"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const products_service_1 = require("./products.service");
const product_entity_1 = require("./entities/product.entity");
const common_1 = require("@nestjs/common");
const mockUser = {
    id: 1,
    tenantId: 'tenant-123',
    username: 'testuser',
    password_hash: 'hashedpassword',
    roles: ['user'],
};
const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    tenantId: mockUser.tenantId,
};
const createProductDto = {
    name: 'New Product',
    price: 150,
};
describe('ProductsService', () => {
    let service;
    let repository;
    const mockProductRepository = {
        create: jest.fn(),
        save: jest.fn().mockResolvedValue(mockProduct),
        find: jest.fn().mockResolvedValue([mockProduct]),
        findOne: jest.fn().mockResolvedValue(mockProduct),
        remove: jest.fn().mockResolvedValue(mockProduct),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                products_service_1.ProductsService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(product_entity_1.Product),
                    useValue: mockProductRepository,
                },
            ],
        }).compile();
        service = module.get(products_service_1.ProductsService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(product_entity_1.Product));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create and save a new product with the correct tenantId', async () => {
            const createdProduct = { ...createProductDto, tenantId: mockUser.tenantId };
            mockProductRepository.create.mockReturnValue(createdProduct);
            mockProductRepository.save.mockResolvedValue(createdProduct);
            const result = await service.create(createProductDto, mockUser);
            expect(repository.create).toHaveBeenCalledWith({
                ...createProductDto,
                tenantId: mockUser.tenantId,
            });
            expect(repository.save).toHaveBeenCalledWith(createdProduct);
            expect(result).toEqual(createdProduct);
        });
    });
    describe('findAllForTenant', () => {
        it('should find all products for the given tenant', async () => {
            await service.findAllForTenant(mockUser);
            expect(repository.find).toHaveBeenCalledWith({
                where: { tenantId: mockUser.tenantId },
            });
        });
    });
    describe('findOne', () => {
        it('should find a product by id and tenantId', async () => {
            await service.findOne(1, mockUser);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1, tenantId: mockUser.tenantId } });
        });
        it('should throw a NotFoundException if the product is not found', async () => {
            mockProductRepository.findOne.mockResolvedValue(null);
            await expect(service.findOne(1, mockUser)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('remove', () => {
        it('should find a product by id and tenantId, and then remove it', async () => {
            jest.spyOn(service, 'findOne').mockResolvedValue(mockProduct);
            await service.remove(1, mockUser);
            expect(service.findOne).toHaveBeenCalledWith(1, mockUser);
            expect(repository.remove).toHaveBeenCalledWith(mockProduct);
        });
    });
});
//# sourceMappingURL=products.service.spec.js.map