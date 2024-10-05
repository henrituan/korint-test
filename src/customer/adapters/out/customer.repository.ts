import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma.service';

import { CustomerRepositoryPort } from '@customer/domain/ports/out/customer.repository.port';
import { Customer } from '@customer/domain/customer.model';

@Injectable()
export class CustomerRepository implements CustomerRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async save(customer: Customer): Promise<Customer> {
    const { id, email, name } = customer;
    const createdCustomer = await this.prisma.customer.create({
      data: {
        id,
        email,
        name,
      },
    });

    return new Customer(
      createdCustomer.id,
      createdCustomer.email,
      createdCustomer.name,
    );
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        claims: true,
      },
    });

    if (!customer) {
      return null;
    }

    return new Customer(
      customer.id,
      customer.email,
      customer.name,
      customer.claims,
    );
  }
}
