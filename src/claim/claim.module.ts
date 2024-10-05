import { Module } from '@nestjs/common';

import { PrismaModule } from '@infra/database/prisma.module';

import { ClaimRepository } from './adapters/out/claim.repository';
import { ClaimController } from './adapters/in/claim.controller';
import { @guards } from './application/claim.service';

@Module({
  controllers: [ClaimController],
  providers: [
    {
      provide: '@guardsPort',
      useClass: @guards,
    },
    {
      provide: 'ClaimRepositoryPort',
      useClass: ClaimRepository,
    },
  ],
  imports: [PrismaModule],
  exports: ['@guardsPort'],
})
export class ClaimModule {}
