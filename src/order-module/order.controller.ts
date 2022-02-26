import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth-module/auth.guard';
import { OrderService } from './order.service';
import { PlainOrderReturn } from './order.types';


@UseGuards(AuthGuard)
@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  async itemsByStatusOrId(
    @Query('status') status,
    @Query('id') id,
  ): Promise<PlainOrderReturn[] | PlainOrderReturn>{
    return await this.orderService.findOrdersByStatus({id, status});
  }

  @Post('/')
  async createOrder(
    @Body() body,
  ): Promise<PlainOrderReturn>{
    return await this.orderService.createOrder(body);
  }

  @Patch('/:id/:status')
  async updateStatus(
    @Param('id') id,
    @Param('status') status,
  ): Promise<PlainOrderReturn>{
    return await this.orderService.updateStatus(id, status);
  }
}
