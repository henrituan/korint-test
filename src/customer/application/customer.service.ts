import { uuid } from 'uuidv4';
import { Inject, Injectable } from '@nestjs/common';

import { ClaimServicePort } from 'src/claim/domain/ports/in/claim.service.port';

import { Customer } from '../domain/customer.model';
import { CustomerServicePort } from '../domain/ports/in/customer.service.port';
import { CustomerRepositoryPort } from '../domain/ports/out/customer.repository.port';

@Injectable()
export class CustomerService implements CustomerServicePort {
  constructor(
    @Inject('CustomerRepositoryPort')
    private readonly customerRepository: CustomerRepositoryPort,
    @Inject('ClaimServicePort') private readonly claimService: ClaimServicePort,
  ) {}

  async createCustomer(
    input: Pick<Customer, 'email' | 'name'>,
  ): Promise<Customer> {
    const { email, name } = input;

    const customer = new Customer(uuid(), email, name);
    return this.customerRepository.save(customer);
  }

  async getCustomerById(customerId: Customer['id']) {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) return null;

    const claims = await this.claimService.getClaimsByCustomerId(customerId);
    claims.forEach((claim) => customer.addClaim(claim));

    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      totalClaimsPoints: customer.getTotalClaimPoints(),
      numberOfClaims: customer.getClaims().length,
    };
  }
}
