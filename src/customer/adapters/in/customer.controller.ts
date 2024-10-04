import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { PartneryKeyGuard } from 'src/guards/partner-key-guard';

import {
  CustomerDTO,
  CustomerServicePort,
} from 'src/customer/domain/ports/in/customer.service.port';

@Controller('customers')
@UseGuards(PartneryKeyGuard)
export class CustomerController {
  constructor(
    @Inject('CustomerServicePort')
    private readonly customerService: CustomerServicePort,
  ) {}

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
