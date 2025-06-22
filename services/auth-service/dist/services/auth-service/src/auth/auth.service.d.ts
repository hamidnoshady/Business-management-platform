import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { TenantsService } from '../tenants/tenants.service';
export declare class AuthService {
    private usersService;
    private tenantsService;
    private jwtService;
    constructor(usersService: UsersService, tenantsService: TenantsService, jwtService: JwtService);
    register(registerDto: RegisterUserDto): Promise<{
        accessToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
