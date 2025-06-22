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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const tenants_service_1 = require("../tenants/tenants.service");
const user_entity_1 = require("../users/entities/user.entity");
let AuthService = class AuthService {
    constructor(usersService, tenantsService, jwtService) {
        this.usersService = usersService;
        this.tenantsService = tenantsService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { email, password, tenantName, tenantSubdomain } = registerDto;
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('کاربری با این ایمیل قبلا ثبت نام کرده است');
        }
        const newTenant = await this.tenantsService.create({
            name: tenantName,
            subdomain: tenantSubdomain
        });
        const newUser = await this.usersService.create({
            email,
            passwordHash: password,
            tenantId: newTenant.id,
            role: user_entity_1.UserRole.ADMIN,
        });
        const payload = { sub: newUser.id, email: newUser.email, tenantId: newUser.tenantId, role: newUser.role };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('ایمیل یا رمز عبور نامعتبر است');
        }
        const isPasswordMatching = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('ایمیل یا رمز عبور نامعتبر است');
        }
        const payload = { sub: user.id, email: user.email, tenantId: user.tenantId, role: user.role };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tenants_service_1.TenantsService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map