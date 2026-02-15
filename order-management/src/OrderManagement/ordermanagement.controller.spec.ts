import { Test, TestingModule } from '@nestjs/testing';
import { OrderManagementService } from './ordermanagement.service';
import { OrderManagementRepository } from './ordermanagement.repository';
import { CreateOrderDto } from './dtos/create-order.dto';

describe('OrderManagementService', () => {
  let service: OrderManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderManagementService,
        {
          provide: OrderManagementRepository,
          useValue : {
            createOrder: jest.fn().mockResolvedValue({
              id: 1,
              userId: 1,
              createdAt: new Date(),
              orderItems: [{ id: 1, orderId: 1, productId: 1, quantity: 3 }]
            })
          }
        }
      ],
    }).compile();

    service = module.get<OrderManagementService>(OrderManagementService);
  });

  it('create order', async () => {
    const input: CreateOrderDto = {
      userId: 1,
      items : [
        { productId : 1, quantity : 3}
      ]
    };

    const result = await service.createOrder(input);

    expect(result).toBeDefined();
    expect(result.userId).toBe(1);
    expect(result.orderItems).toHaveLength(1);
    expect(result.orderItems[0]).toMatchObject({
      productId: 1,
      quantity: 3,
    })
  });
});
