import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Customer } from '../../customer.model';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CustomerRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  input: CreateCustomerDto;
}

export class CustomerDTO {
  @IsEmail()
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
