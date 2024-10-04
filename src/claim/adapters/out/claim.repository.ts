import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

import { Claim } from 'src/claim/domain/claim.model';
import { ClaimRepositoryPort } from 'src/claim/domain/ports/out/Claim.repository.port';
import { Customer } from 'src/customer/domain/customer.model';

@Injectable()
export class ClaimRepository implements ClaimRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async saveMany(claims: Claim[]): Promise<number> {
    const resp = await this.prisma.claim.createMany({
      data: claims.map((claim) => ({
        id: claim.id,
        title: claim.title,
        description: claim.description,
        customerId: claim.customerId,
        pointValue: claim.pointValue,
      })),
    });

    return resp.count;
  }

  async findByCustomerId(customerId: Customer['id']): Promise<Claim[]> {
    return await this.prisma.claim.findMany({
      where: { customerId },
    });
  }
}
