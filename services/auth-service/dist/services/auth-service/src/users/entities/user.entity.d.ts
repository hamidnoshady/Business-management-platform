import { Tenant } from '../../tenants/entities/tenant.entity';
export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    SALES_REP = "sales_rep",
    SUPER_ADMIN = "super_admin"
}
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    tenantId: string;
    tenant: Tenant;
    createdAt: Date;
    hashPassword(): Promise<void>;
}
