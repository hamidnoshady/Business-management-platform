"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const mockUser = {
    id: 1,
    tenantId: 'tenant-123',
    username: 'testuser',
    password_hash: 'hashedpassword',
    roles: ['user'],
};
const createProductDto = {
    name: 'New Product',
    price: 150,
};
describe('ProductsController', () => {
    let controller;
    let service;
    const mockProductsService = {
        create: jest.fn(),
        findAllForTenant: jest.fn(),
        findOne: jest.fn(),
        remove: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [products_controller_1.ProductsController],
            providers: [
                {
                    provide: products_service_1.ProductsService,
                    useValue: mockProductsService,
                },
            ],
        })
            .overrideGuard(jwt_auth_guard_1.JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .compile();
        controller = module.get(products_controller_1.ProductsController);
        service = module.get(products_service_1.ProductsService);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('create', () => {
        it('should call productsService.create with the correct parameters', async () => {
            const mockRequest = { user: mockUser };
            await controller.create(createProductDto, mockRequest);
            expect(service.create).toHaveBeenCalledWith(createProductDto, mockUser);
        });
    });
    describe('findAll', () => {
        it('should call productsService.findAllForTenant with the correct parameters', async () => {
            const mockRequest = { user: mockUser };
            await controller.findAll(mockRequest);
            expect(service.findAllForTenant).toHaveBeenCalledWith(mockUser);
        });
    });
    describe('findOne', () => {
        it('should call productsService.findOne with the correct parameters', async () => {
            const mockRequest = { user: mockUser };
            await controller.findOne(1, mockRequest);
            expect(service.findOne).toHaveBeenCalledWith(1, mockUser);
        });
    });
    describe('remove', () => {
        it('should call productsService.remove with the correct parameters', async () => {
            const mockRequest = { user: mockUser };
            await controller.remove(1, mockRequest);
            expect(service.remove).toHaveBeenCalledWith(1, mockUser);
        });
    });
});
//# sourceMappingURL=products.controller.spec.js.map