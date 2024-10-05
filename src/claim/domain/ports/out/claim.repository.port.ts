import { Customer } from '@customer/domain/customer.model';
import { Claim } from '../../claim.model';

export interface ClaimRepositoryPort {
  saveMany(Claims: Claim[]): Promise<number>;
  findByCustomerId(customerId: Customer['id']): Promise<Claim[]>;
}
