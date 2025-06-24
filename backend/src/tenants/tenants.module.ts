import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
