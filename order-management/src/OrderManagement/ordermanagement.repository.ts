import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { createUserDto } from './dtos/create-user.dto';
import { createProductDto } from './dtos/create-product.dto';

@Injectable()
export class OrderManagementRepository {
  constructor(private prisma: PrismaService) {}

  async createUsers(input : createUserDto){
    return await this.prisma.user.create({
      data: {
        name : input.name,
        email : input.email
      }
    })
  }

  async createProduct(input : createProductDto){
    return await this.prisma.product.create({
      data: {
        name : input.name,
        price : input.price,
        stock : input.stock
      }
    })
  }

  async createOrder(input : CreateOrderDto){
    const { userId, items } = input;

    return await this.prisma.order.create({
      data: {
        userId,
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity
          })),
        }
      }
    });
  }
}
