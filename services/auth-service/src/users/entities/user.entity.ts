
// ================================================================
// file: services/auth-service/src/users/entities/user.entity.ts
// توضیحات: تعریف موجودیت (Entity) برای جدول users
// ================================================================
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, BeforeInsert } from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

// تعریف نقش‌های کاربری
export enum UserRole {
  ADMIN = 'admin', // ادمین مستأجر
  EDITOR = 'editor',
  SALES_REP = 'sales_rep',
  SUPER_ADMIN = 'super_admin' // ادمین کل پلتفرم
}

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  email: string;

  @Exclude() // این فیلد در خروجی API نمایش داده نمی‌شود
  @Column()
  passwordHash: string;
  
  @ApiProperty({ enum: UserRole, default: UserRole.EDITOR })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EDITOR,
  })
  role: UserRole;

  @ApiProperty()
  @Column()
  tenantId: string; // کلید خارجی برای پیوند با مستأجر

  @ManyToOne(() => Tenant, tenant => tenant.users, { onDelete: 'CASCADE' })
  tenant: Tenant;
  
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
  
  // قبل از ذخیره کردن کاربر، رمز عبور را هش می‌کند
  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
}