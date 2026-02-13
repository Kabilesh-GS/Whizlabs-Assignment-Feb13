import {Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { OrderManagementService } from './ordermanagement.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { createUserDto } from './dtos/create-user.dto';
import { createProductDto } from './dtos/create-product.dto';

@Controller()
export class OrderManagementController {
  constructor( private readonly orderManagementService: OrderManagementService){}

  @Post('adduser')
  async createUsers(@Body() input : createUserDto){
    return await this.orderManagementService.createUsers(input)
  }

  @Post('addproduct')
  async createProduct(@Body() input : createProductDto){
    return await this.orderManagementService.createProduct(input)
  }

  @Post('addorder')
    async createOrder(@Body() input : CreateOrderDto){
      return await this.orderManagementService.createOrder(input)
    }
}
