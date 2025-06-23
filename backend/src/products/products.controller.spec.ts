import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

const mockUser: User = {
  id: 1,
  tenantId: 'tenant-123',
  username: 'testuser',
  password_hash: 'hashedpassword',
  roles: ['user'],
};

const createProductDto: CreateProductDto = {
  name: 'New Product',
  price: 150,
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn(),
    findAllForTenant: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
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
