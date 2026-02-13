import {Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { OrderManagementService } from './ordermanagement.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { createUserDto } from './dtos/create-user.dto';

@Controller()
export class OrderManagementController {
  constructor( private readonly orderManagementService: OrderManagementService){}

  @Post('adduser')
  async createUsers(@Body() input : createUserDto){
    return await this.orderManagementService.createUsers(input)
  }
}
