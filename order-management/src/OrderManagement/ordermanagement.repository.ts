import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { createUserDto } from './dtos/create-user.dto';
import { createProductDto } from './dtos/create-product.dto';

@Injectable()
export class OrderManagementRepository {
  constructor(private prisma: PrismaService){}
  private loggger = new Logger(OrderManagementRepository.name, {});

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

    return await this.prisma.$transaction(async (transaction) => {
      console.log(items);
      for(const item of items){
        const availableStock = await transaction.product.findUnique({
          select: { 
            stock: true 
          },
          where: { 
            id: item.productId 
          },
        });

        console.log(availableStock);
        if(!availableStock){
          this.loggger.error("no Such product");
          throw new BadRequestException('No such product.');
        }
        if(availableStock.stock < item.quantity){
          this.loggger.error("Insufficient stock");
          throw new BadRequestException('Insufficient stock.');
        }

        await transaction.product.update({
          where: { 
            id: item.productId 
          },
          data: { 
            stock: availableStock.stock - item.quantity 
          },
        });
      }

      return await transaction.order.create({
        data: {
          userId,
          orderItems: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity
            })),
          }
        },
        include: {
          orderItems: true
        }
      });
    })
  }
}
