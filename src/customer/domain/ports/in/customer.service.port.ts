import { Customer } from '../../customer.model';

export class CustomerDTO {
  email: string;
  name: string;
}

export interface CustomerServicePort {
  createCustomer(input: CustomerDTO): Promise<Customer>;
  getCustomerById(customerId: Customer['id']): Promise<{
    id: string;
    email: string;
    name: string;
    totalClaimsPoints: number;
    numberOfClaims: number;
  } | null>;
}
