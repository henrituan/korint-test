import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { PartneryKeyGuard } from '@guards/partner-key-guard';

import {
  ClaimServicePort,
  ClaimDTO,
} from '@claim/domain/ports/in/claim.service.port';

@Controller('claims')
@UseGuards(PartneryKeyGuard)
export class ClaimController {
  constructor(
    @Inject('ClaimServicePort') private readonly claimService: ClaimServicePort,
  ) {}

  @Post()
  async createClaims(
    @Body()
    data: {
      input: ClaimDTO[];
    },
  ) {
    return await this.claimService.createClaims(data.input);
  }
}
