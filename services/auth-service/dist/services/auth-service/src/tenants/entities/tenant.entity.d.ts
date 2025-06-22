import { User } from '../../users/entities/user.entity';
export declare class Tenant {
    id: string;
    name: string;
    subdomain: string;
    customDomain: string;
    createdAt: Date;
    users: User[];
}
