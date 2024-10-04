import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';

import { ClaimService } from 'src/claim/application/claim.service';

import { Customer } from '../domain/customer.model';
import { CustomerServicePort } from '../domain/ports/in/customer.service.port';
import { CustomerRepositoryPort } from '../domain/ports/out/customer.repository.port';

@Injectable()
export class CustomerService implements CustomerServicePort {
  constructor(
    private readonly customerRepository: CustomerRepositoryPort,
    private readonly claimService: ClaimService,
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
