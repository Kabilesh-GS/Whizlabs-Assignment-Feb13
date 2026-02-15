import { Test, TestingModule } from '@nestjs/testing';
import { OrderManagementService } from './ordermanagement.service';
import { CreateOrderDto } from './dtos/create-order.dto';

describe('OrderManagementService', () => {
  let service: OrderManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderManagementService],
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
  });
});
