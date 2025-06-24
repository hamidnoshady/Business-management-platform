import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from '@/products/dto/create-product.dto';
import { User } from '../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

const mockUser: User = {
  id: 1,
  tenant: { id: 1, name: 'Test Tenant', users: [] },
  username: 'testuser',
  password_hash: 'hashedpassword',
  roles: ['user'],
};

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: 100,
  tenantId: mockUser.tenant.id,
};

const createProductDto: CreateProductDto = {
  name: 'New Product',
  price: 150,
};

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockProductRepository = {
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(mockProduct),
    find: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    remove: jest.fn().mockResolvedValue(mockProduct),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new product with the correct tenantId', async () => {
      const createdProduct = { ...createProductDto, tenantId: mockUser.tenant.id };
      mockProductRepository.create.mockReturnValue(createdProduct);
      mockProductRepository.save.mockResolvedValue(createdProduct as any);

      const result = await service.create(createProductDto, mockUser);

      expect(repository.create).toHaveBeenCalledWith({
        ...createProductDto,
        tenantId: mockUser.tenant.id,
      });
      expect(repository.save).toHaveBeenCalledWith(createdProduct);
      expect(result).toEqual(createdProduct);
    });
  });

  describe('findAllForTenant', () => {
    it('should find all products for the given tenant', async () => {
      await service.findAllForTenant(mockUser);
      expect(repository.find).toHaveBeenCalledWith({
        where: { tenantId: mockUser.tenant.id },
      });
    });
  });

  describe('findOne', () => {
    it('should find a product by id and tenantId', async () => {
      await service.findOne(1, mockUser);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1, tenantId: mockUser.tenant.id } });
    });

    it('should throw a NotFoundException if the product is not found', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1, mockUser)).rejects.toThrow(NotFoundException);
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
