// ================================================================
// file: services/auth-service/src/users/users.service.ts
// توضیحات: سرویس برای مدیریت منطق مربوط به کاربران
// ================================================================
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`کاربری با این شناسه یافت نشد`);
    }
    return user;
  }
  
  async create(userData: Partial<User>): Promise<User> {
      const newUser = this.usersRepository.create(userData);
      return this.usersRepository.save(newUser);
  }
}
