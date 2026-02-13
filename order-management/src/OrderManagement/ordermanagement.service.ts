import { Injectable } from '@nestjs/common';
import { OrderManagementRepository } from './ordermanagement.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
import { createUserDto } from './dtos/create-user.dto';
import { createProductDto } from './dtos/create-product.dto';

@Injectable()
export class OrderManagementService {
  constructor(private readonly orderManagementRepo: OrderManagementRepository) {}


  async createUsers(input : createUserDto){
    return await this.orderManagementRepo.createUsers(input);
  }

  async createProduct(input : createProductDto){
    return await this.orderManagementRepo.createProduct(input);
  }

  async createOrder(input : CreateOrderDto){
    return await this.orderManagementRepo.createOrder(input);
  }
}
