import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { PartneryKeyGuard } from '@guards/partner-key-guard';

import {
  @guardsPort,
  ClaimDTO,
} from '@claim/domain/ports/in/claim.service.port';

@Controller('claims')
@UseGuards(PartneryKeyGuard)
export class ClaimController {
  constructor(
    @Inject('@guardsPort') private readonly @guards: @guardsPort,
  ) {}

  @Post()
  async createClaims(
    @Body()
    data: {
      input: ClaimDTO[];
    },
  ) {
    return await this.@guards.createClaims(data.input);
  }
}
