import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ClaimModule } from './claim/claim.module';
import { PrismaModule } from './infra/database/prisma.module';

@Module({
  imports: [CustomerModule, ClaimModule, PrismaModule],
})
export class AppModule {}
