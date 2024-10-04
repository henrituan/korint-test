import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ClaimModule } from './claim/claim.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make configuration available globally
    }),
    CustomerModule,
    ClaimModule,
  ],
})
export class AppModule {}
