import { Module } from '@nestjs/common';

import { PrismaModule } from '@infra/database/prisma.module';

import { CustomerController } from './adapters/in/customer.controller';
import { CustomerService } from './application/customer.service';
import { CustomerRepository } from './adapters/out/customer.repository';

@Module({
  imports: [PrismaModule],
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
