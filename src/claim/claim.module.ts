import { Module } from '@nestjs/common';

import { PrismaModule } from '@infra/database/prisma.module';

import { ClaimRepository } from './adapters/out/claim.repository';
import { ClaimController } from './adapters/in/claim.controller';
import { ClaimService } from './application/claim.service';

@Module({
  controllers: [ClaimController],
  providers: [
    {
      provide: 'ClaimServicePort',
      useClass: ClaimService,
    },
    {
      provide: 'ClaimRepositoryPort',
      useClass: ClaimRepository,
    },
  ],
  imports: [PrismaModule],
  exports: ['ClaimServicePort'],
})
export class ClaimModule {}
