import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Inject,
  UseGuards,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { PartneryKeyGuard } from '@guards/partner-key-guard';

import {
  CustomerRequestDto,
  CustomerServicePort,
} from '@customer/domain/ports/in/customer.service.port';

@Controller('customers')
@UseGuards(PartneryKeyGuard)
export class CustomerController {
  constructor(
    @Inject('CustomerServicePort')
    private readonly customerService: CustomerServicePort,
  ) {}

  @Post()
  async createCustomer(
    @Body(new ValidationPipe({ transform: true }))
    data: CustomerRequestDto,
  ) {
    const customer = await this.customerService.createCustomer(data.input);

    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
    };
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    const customer = await this.customerService.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }
}
