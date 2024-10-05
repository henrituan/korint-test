import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { PrismaModule } from '@infra/database/prisma.module';
import { PrismaService } from '@infra/database/prisma.service';

import { PartneryKeyGuard } from '@guards/partner-key-guard';

import { CustomerController } from '@customer/adapters/in/customer.controller';
import { CustomerServicePort } from '@customer/domain/ports/in/customer.service.port';
import { Customer } from '@customer/domain/customer.model';

const MOCK_CUSTOMER_ID = 'customer-id-1';
const MOCK_CUSTOMER_EMAIL = 'alex@gmail.com';
const MOCK_CUSTOMER_NAME = 'Alexis Sanchez';

const mockPrismaService = {
  customer: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  $connect: jest.fn(),
  $disconnect: jest.fn(),
};

describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let mockCustomerService: jest.Mocked<CustomerServicePort>;
  let mockGuardValue = true;

  const mockGuard = {
    canActivate: () => {
      return mockGuardValue;
    },
  };

  beforeAll(async () => {
    // Mock CustomerService
    mockCustomerService = {
      createCustomer: jest.fn(),
      getCustomerById: jest.fn(),
    };

    // Mock guards
    // const mockGuard = { canActivate: jest.fn().mockReturnValue(true) };
    jest
      .spyOn(PartneryKeyGuard.prototype, 'canActivate')
      .mockReturnValueOnce(false);

    // Mock modules
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      imports: [PrismaModule],
      providers: [
        {
          provide: 'CustomerServicePort',
          useValue: mockCustomerService,
        },
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideGuard(PartneryKeyGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGuardValue = true;
  });

  describe('POST /customers', () => {
    it('should create a new customer', () => {
      jest
        .spyOn(PartneryKeyGuard.prototype, 'canActivate')
        .mockReturnValueOnce(false);

      const customerDto = {
        input: {
          email: MOCK_CUSTOMER_EMAIL,
          name: MOCK_CUSTOMER_NAME,
        },
      };

      const mockCreatedCustomer = new Customer(
        MOCK_CUSTOMER_ID,
        MOCK_CUSTOMER_EMAIL,
        MOCK_CUSTOMER_NAME,
      );
      mockCustomerService.createCustomer.mockResolvedValueOnce(
        mockCreatedCustomer,
      );

      return request(app.getHttpServer())
        .post('/customers')
        .send(customerDto)
        .expect(201)
        .expect((response) => {
          expect(response.body).toEqual({
            id: MOCK_CUSTOMER_ID,
            email: MOCK_CUSTOMER_EMAIL,
            name: MOCK_CUSTOMER_NAME,
          });
          expect(mockCustomerService.createCustomer).toHaveBeenCalledWith(
            customerDto.input,
          );
        });
    });

    it('should return 400 for invalid input', () => {
      const invalidCustomerDto = {
        input: {
          email: MOCK_CUSTOMER_EMAIL,
          // Missing required fields
        },
      };

      return request(app.getHttpServer())
        .post('/customers')
        .send(invalidCustomerDto)
        .expect(400);
    });

    it('should return 403 when auth failed', () => {
      // Disable the mock guard
      mockGuardValue = false;

      return request(app.getHttpServer())
        .post('/customers')
        .send({
          input: {
            email: MOCK_CUSTOMER_EMAIL,
            name: MOCK_CUSTOMER_NAME,
          },
        })
        .expect(403);
    });
  });

  describe('GET /customers/:id', () => {
    it('should return a customer when found', () => {
      const mockCustomer = {
        id: MOCK_CUSTOMER_ID,
        email: MOCK_CUSTOMER_EMAIL,
        name: MOCK_CUSTOMER_NAME,
        totalClaimsPoints: 100,
        numberOfClaims: 2,
      };

      mockCustomerService.getCustomerById.mockResolvedValueOnce(mockCustomer);

      return request(app.getHttpServer())
        .get('/customers/test-id')
        .expect(200)
        .expect(mockCustomer);
    });

    it('should return 404 when customer is not found', () => {
      mockCustomerService.getCustomerById.mockResolvedValueOnce(null);

      return request(app.getHttpServer())
        .get('/customers/non-existent-id')
        .expect(404);
    });

    it('should return 403 when auth failed', () => {
      // Disable the mock guard
      mockGuardValue = false;

      return request(app.getHttpServer())
        .get(`/customers/${MOCK_CUSTOMER_ID}`)
        .expect(403);
    });
  });
});
