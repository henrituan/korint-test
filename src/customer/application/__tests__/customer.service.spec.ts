import { Test } from '@nestjs/testing';

import { CustomerService } from '../customer.service';
import { Customer } from '../../domain/customer.model';
import { CustomerRepositoryPort } from '../../domain/ports/out/customer.repository.port';
import { Claim } from '@claim/domain/claim.model';

const MOCK_CUSTOMER_ID = 'customer-id-1';
const MOCK_CUSTOMER_EMAIL = 'alex@gmail.com';
const MOCK_CUSTOMER_NAME = 'Alexis Sanchez';

// Mock UUID to have consistent IDs in tests
jest.mock('uuidv4', () => ({
  uuid: jest.fn().mockReturnValue('customer-id-1'),
}));

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: jest.Mocked<CustomerRepositoryPort>;

  beforeEach(async () => {
    const mockCustomerRepository: jest.Mocked<CustomerRepositoryPort> = {
      save: jest.fn(),
      findById: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: 'CustomerRepositoryPort',
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    customerService = moduleRef.get<CustomerService>(CustomerService);
    customerRepository = moduleRef.get('CustomerRepositoryPort');
  });

  describe('createCustomer', () => {
    it('should create a new customer and save it to the repository', async () => {
      const customerInput = {
        email: MOCK_CUSTOMER_EMAIL,
        name: MOCK_CUSTOMER_NAME,
      };

      const expectedCustomer = new Customer(
        MOCK_CUSTOMER_ID,
        MOCK_CUSTOMER_EMAIL,
        MOCK_CUSTOMER_NAME,
      );
      customerRepository.save.mockResolvedValue(expectedCustomer);

      const result = await customerService.createCustomer(customerInput);

      expect(customerRepository.save).toHaveBeenCalledWith(expectedCustomer);
      expect(result).toEqual(expectedCustomer);
    });
  });

  describe('getCustomerById', () => {
    it('should return customer details when customer is found', async () => {
      const mockCustomer = new Customer(
        MOCK_CUSTOMER_ID,
        MOCK_CUSTOMER_EMAIL,
        MOCK_CUSTOMER_NAME,
      );

      jest
        .spyOn(mockCustomer, 'getClaims')
        .mockReturnValue([{}, {}] as Claim[]);
      jest.spyOn(mockCustomer, 'getTotalClaimPoints').mockReturnValue(100);

      customerRepository.findById.mockResolvedValue(mockCustomer);

      const result = await customerService.getCustomerById(MOCK_CUSTOMER_ID);

      expect(result).toEqual({
        id: MOCK_CUSTOMER_ID,
        email: MOCK_CUSTOMER_EMAIL,
        name: MOCK_CUSTOMER_NAME,
        totalClaimsPoints: 100,
        numberOfClaims: 2,
      });
      expect(customerRepository.findById).toHaveBeenCalledWith(
        MOCK_CUSTOMER_ID,
      );
    });

    it('should return null when customer is not found', async () => {
      customerRepository.findById.mockResolvedValue(null);

      const result = await customerService.getCustomerById('non-existent-id');

      expect(result).toBeNull();
      expect(customerRepository.findById).toHaveBeenCalledWith(
        'non-existent-id',
      );
    });
  });
});
