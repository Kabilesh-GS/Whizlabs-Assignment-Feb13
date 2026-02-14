import {Controller, Post, Get, Body, Param, ParseIntPipe, Logger } from '@nestjs/common';
import { OrderManagementService } from './ordermanagement.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { createUserDto } from './dtos/create-user.dto';
import { createProductDto } from './dtos/create-product.dto';

@Controller()
export class OrderManagementController {
  constructor( private readonly orderManagementService: OrderManagementService){}
  private logger = new Logger(OrderManagementController.name,{});

  @Post('adduser')
  async createUsers(@Body() input : createUserDto){
    this.logger.log("Hit on adduser API")
    return await this.orderManagementService.createUsers(input)
  }

  @Post('addproduct')
  async createProduct(@Body() input : createProductDto){
    this.logger.log("Hit on addproduct API")
    return await this.orderManagementService.createProduct(input)
  }

  @Post('addorder')
    async createOrder(@Body() input : CreateOrderDto){
      this.logger.log("Hit on addorder API")
      return await this.orderManagementService.createOrder(input)
    }
}
