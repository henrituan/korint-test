import { Claim } from '../../claim.model';

export class ClaimDTO {
  title: string;
  description: string;
  customerId: string;
  pointValue: number;
}

export interface @guardsPort {
  // todo: return a more explicit response (eg: how many failed, how many succeeded, failure reasons)
  createClaims(input: ClaimDTO[]): Promise<number>;
  getClaimsByCustomerId(customerId: Claim['customerId']): Promise<Claim[]>;
}
