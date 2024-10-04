import { Injectable } from '@nestjs/common';

import { ClaimRepositoryPort } from 'src/claim/domain/ports/out/claim.repository.port';

import { Claim } from '../domain/claim.model';
import { ClaimServicePort } from '../domain/ports/in/claim.service.port';

@Injectable()
export class ClaimService implements ClaimServicePort {
  constructor(private readonly claimRepository: ClaimRepositoryPort) {}

  async createClaims(claims: Claim[]): Promise<number> {
    return this.claimRepository.saveMany(claims);
  }

  async getClaimsByCustomerId(customerId: string): Promise<Claim[]> {
    return this.claimRepository.findByCustomerId(customerId);
  }
}
