import { Module } from '@nestjs/common';
import { ItemModule } from 'src/item-module/item.module';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Module({
  imports: [ItemModule],
  controllers: [OrderController],
  providers: [OrderService, Order],
  exports: [OrderService]
})
export class OrderModule {}
