import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { createUserDto } from './dtos/create-user.dto';

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
}
