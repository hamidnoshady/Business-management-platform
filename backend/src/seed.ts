// backend/src/seed.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from './tenants/entities/tenant.entity';
import { User } from './users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const tenantRepository = app.get(getRepositoryToken(Tenant));
    const userRepository = app.get(getRepositoryToken(User));

    // --- 1. Create a default tenant ---
    console.log('Creating Admin Tenant...');
    // Check if tenant already exists
    let adminTenant = await tenantRepository.findOne({ where: { name: 'Admin Tenant' } });
    if (!adminTenant) {
      adminTenant = tenantRepository.create({ name: 'Admin Tenant' });
      await tenantRepository.save(adminTenant);
      console.log('Admin Tenant created successfully.');
    } else {
      console.log('Admin Tenant already exists.');
    }


    // --- 2. Create a default admin user ---
    console.log('Creating Admin User...');
    const adminUserExists = await userRepository.findOne({ where: { username: 'admin@example.com' } });

    if (!adminUserExists) {
        const hashedPassword = await bcrypt.hash('password', 10);
      
        // Create the user instance and explicitly associate it with the tenant
        const adminUser = userRepository.create({
          username: 'admin@example.com',
          password_hash: hashedPassword,
          // Associate the user with the created tenant
          tenant: adminTenant, 
          roles: ['admin'], 
        });
    
        await userRepository.save(adminUser);
        console.log('Admin User created successfully.');
    } else {
        console.log('Admin user already exists.');
    }
    
  } catch (error) {
    console.error('Seeding failed!');
    console.error(error);
    process.exit(1);
  } finally {
    console.log('Seeding completed successfully.');
    process.exit(0);
  }
}

seed();
