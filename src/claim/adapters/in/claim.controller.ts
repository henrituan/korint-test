import { Controller, Post, Body, Inject } from '@nestjs/common';

import {
  ClaimServicePort,
  ClaimDTO,
} from 'src/claim/domain/ports/in/claim.service.port';

@Controller('claims')
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
