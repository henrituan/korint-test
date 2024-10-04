import { Module } from '@nestjs/common';

import { ClaimModule } from 'src/claim/claim.module';
import { PrismaModule } from 'src/infra/database/prisma.module';

import { CustomerController } from './adapters/in/customer.controller';
import { CustomerService } from './application/customer.service';
import { CustomerRepository } from './adapters/out/customer.repository';

@Module({
  imports: [ClaimModule, PrismaModule],
  providers: [
    {
      provide: 'CustomerServicePort',
      useClass: CustomerService,
    },
    {
      provide: 'CustomerRepositoryPort',
      useClass: CustomerRepository,
    },
  ],
  controllers: [CustomerController],
  exports: ['CustomerServicePort'],
})
export class CustomerModule {}
