import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(`[AuthService] Attempting to validate user: ${email}`);
    const user = await this.usersService.findOne(email);

    if (!user) {
      console.log(`[AuthService] User not found: ${email}`);
      return null;
    }
    console.log(`[AuthService] User found: ${user.username}`);

    const isPasswordMatching = await bcrypt.compare(pass, user.password_hash);

    if (!isPasswordMatching) {
      console.log(`[AuthService] Password does not match for user: ${email}`);
      return null;
    }

    console.log(`[AuthService] User validated successfully: ${email}`);
    const { password_hash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
      tenantId: user.tenant.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  getProfile(user: any) {
    return this.usersService.findOne(user.username);
  }
}
