import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Health } from './Health/health.module';
import { OrderManagementModule } from './OrderManagement/ordermanagement.module';

@Module({
  imports: [Health, OrderManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
