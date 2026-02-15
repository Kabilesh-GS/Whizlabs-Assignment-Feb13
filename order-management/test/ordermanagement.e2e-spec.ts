import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { OrderManagementController } from '../src/OrderManagement/ordermanagement.controller';
import { OrderManagementService } from '../src/OrderManagement/ordermanagement.service';
import { OrderManagementRepository } from '../src/OrderManagement/ordermanagement.repository';

describe('OrderManagementController (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [OrderManagementController],
      providers: [
        OrderManagementService,{
          provide: OrderManagementRepository,
          useValue: {
            createOrder: jest.fn().mockResolvedValue({
              id: 1,
              userId: 1,
              createdAt: new Date(),
              orderItems: [
                { id: 1, orderId: 1, productId: 1, quantity: 2 },
                { id: 2, orderId: 1, productId: 2, quantity: 1 },
              ]
            })
          }
        }
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /addorder should create order with items', async () => {
    const orderInput = {
      userId: 1,
      items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
    };

    const response = await request(app.getHttpServer()).post('/addorder').send(orderInput).expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.userId).toBe(1);
    expect(response.body.orderItems.length).toBe(2);
    expect(response.body.orderItems[0].productId).toBe(1);
    expect(response.body.orderItems[0].quantity).toBe(2);
    expect(response.body.orderItems[1].productId).toBe(2);
    expect(response.body.orderItems[1].quantity).toBe(1);
  });

  afterAll(async () => {
    await app.close();
  })
});
