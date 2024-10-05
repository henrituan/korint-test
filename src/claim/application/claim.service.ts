import { Inject, Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';

import { ClaimRepositoryPort } from '@claim/domain/ports/out/claim.repository.port';

import { Claim } from '../domain/claim.model';
import {
  ClaimDTO,
  @guardsPort,
} from '../domain/ports/in/claim.service.port';

@Injectable()
export class @guards implements @guardsPort {
  constructor(
    @Inject('ClaimRepositoryPort')
    private readonly claimRepository: ClaimRepositoryPort,
  ) {}

  async createClaims(input: ClaimDTO[]): Promise<number> {
    const claimsToSave = input.map(
      (claim) =>
        new Claim(
          uuid(),
          claim.title,
          claim.description,
          claim.pointValue,
          claim.customerId,
        ),
    );

    return this.claimRepository.saveMany(claimsToSave);
  }

  async getClaimsByCustomerId(customerId: string): Promise<Claim[]> {
    return this.claimRepository.findByCustomerId(customerId);
  }
}
