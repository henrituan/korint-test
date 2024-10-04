import { Claim } from 'src/claim/domain/claim.model';

export class Customer {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    private claims: Claim[] = [],
  ) {}

  addClaim(claim: Claim): void {
    this.claims.push(claim);
  }

  getTotalClaimPoints(): number {
    return this.claims.reduce((sum, claim) => sum + claim.pointValue, 0);
  }

  getClaims(): Claim[] {
    return [...this.claims];
  }
}
