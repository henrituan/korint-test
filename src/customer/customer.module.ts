import { Module } from '@nestjs/common';
import { CustomerController } from './adapters/in/customer.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CustomerService } from './application/customer.service';
import { CustomerRepository } from './adapters/out/customer.repository';
import { ClaimModule } from 'src/claim/claim.module';

@Module({
  controllers: [CustomerController],
  providers: [PrismaService, CustomerService, CustomerRepository, ClaimModule],
  exports: [CustomerController, CustomerService],
})
export class CustomerModule {}
