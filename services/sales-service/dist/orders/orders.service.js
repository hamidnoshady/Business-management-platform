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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const products_service_1 = require("../products/products.service");
const order_item_entity_1 = require("./entities/order-item.entity");
let OrdersService = class OrdersService {
    constructor(ordersRepository, productsService) {
        this.ordersRepository = ordersRepository;
        this.productsService = productsService;
    }
    async create(createOrderDto, tenantId) {
        const { customerId, items } = createOrderDto;
        const productIds = items.map(item => item.productId);
        const products = await this.productsService.findProductsByIds(productIds, tenantId);
        if (products.length !== productIds.length) {
            throw new common_1.BadRequestException('یک یا چند محصول نامعتبر یا متعلق به این کسب‌وکار نیستند.');
        }
        let totalAmount = 0;
        const orderItems = items.map(itemDto => {
            const product = products.find(p => p.id === itemDto.productId);
            totalAmount += product.price * itemDto.quantity;
            const orderItem = new order_item_entity_1.OrderItem();
            orderItem.productId = product.id;
            orderItem.productName = product.name;
            orderItem.quantity = itemDto.quantity;
            orderItem.price = product.price;
            return orderItem;
        });
        const newOrder = this.ordersRepository.create({
            customerId,
            tenantId,
            totalAmount,
            items: orderItems,
            status: order_entity_1.OrderStatus.PENDING,
        });
        return this.ordersRepository.save(newOrder);
    }
    async findAll(tenantId) {
        return this.ordersRepository.find({ where: { tenantId } });
    }
    async findOne(id, tenantId) {
        const order = await this.ordersRepository.findOne({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException(`سفارش با شناسه ${id} یافت نشد.`);
        if (order.tenantId !== tenantId)
            throw new common_1.ForbiddenException('دسترسی به این منبع مجاز نیست.');
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map