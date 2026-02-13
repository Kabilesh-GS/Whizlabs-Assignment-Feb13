import { Module } from '@nestjs/common';
import { OrderManagementController } from './ordermanagement.controller';
import { OrderManagementService } from './ordermanagement.service';
import { OrderManagementRepository } from './ordermanagement.repository';
import { PrismaModule } from '../Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrderManagementController],
  providers: [OrderManagementService, OrderManagementRepository],
  exports: [OrderManagementService],
})
export class OrderManagementModule {}
