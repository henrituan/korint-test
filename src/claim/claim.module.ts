import { Module } from '@nestjs/common';

import { ClaimRepository } from './adapters/out/claim.repository';
import { ClaimController } from './adapters/in/claim.controller';
import { ClaimService } from './application/claim.service';

@Module({
  controllers: [ClaimController],
  providers: [ClaimRepository, ClaimService],
  exports: [ClaimService],
})
export class ClaimModule {}
