import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ClaimModule } from './claim/claim.module';

@Module({
  imports: [CustomerModule, ClaimModule],
})
export class AppModule {}
