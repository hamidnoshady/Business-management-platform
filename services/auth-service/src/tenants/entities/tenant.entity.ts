
// ================================================================
// file: services/auth-service/src/tenants/entities/tenant.entity.ts
// توضیحات: تعریف موجودیت (Entity) برای جدول tenants
// ================================================================
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tenants')
export class Tenant {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  subdomain: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ unique: true, nullable: true })
  customDomain: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
  
  @OneToMany(() => User, user => user.tenant)
  users: User[];
}

