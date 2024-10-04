import { Controller, Post, Get, Body, Param } from '@nestjs/common';

import {
  CustomerDTO,
  CustomerServicePort,
} from 'src/customer/domain/ports/in/customer.service.port';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerServicePort) {}

  @Post()
  async createCustomer(@Body() data: { input: CustomerDTO }) {
    const customer = await this.customerService.createCustomer(data.input);

    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
    };
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    return this.customerService.getCustomerById(id);
  }
}
