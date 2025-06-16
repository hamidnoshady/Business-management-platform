
// ================================================================
// file: services/auth-service/src/tenants/tenants.service.ts
// ================================================================
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
    constructor(
        @InjectRepository(Tenant)
        private tenantsRepository: Repository<Tenant>,
    ) {}

    async findBySubdomain(subdomain: string): Promise<Tenant | undefined> {
        return this.tenantsRepository.findOne({ where: { subdomain } });
    }

    async create(tenantData: { name: string, subdomain: string }): Promise<Tenant> {
        const existingTenant = await this.findBySubdomain(tenantData.subdomain);
        if (existingTenant) {
            throw new ConflictException('این زیر دامنه قبلا ثبت شده است');
        }
        const newTenant = this.tenantsRepository.create(tenantData);
        return this.tenantsRepository.save(newTenant);
    }
}

