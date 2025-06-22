import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
export declare class TenantsService {
    private tenantsRepository;
    constructor(tenantsRepository: Repository<Tenant>);
    findBySubdomain(subdomain: string): Promise<Tenant | undefined>;
    create(tenantData: {
        name: string;
        subdomain: string;
    }): Promise<Tenant>;
}
