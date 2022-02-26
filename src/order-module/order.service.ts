import { repositories } from 'src/database-module/database.repositories';
import { Inject, Injectable } from '@nestjs/common';
import { Order } from './order.model';
import { CreateOrderParams, FindByStatusOrIdParams, OrderStatus, PlainOrderReturn } from './order.types';
import { REQUEST } from '@nestjs/core';
import { PlainUserReturn } from 'src/auth-module/auth.types';
import { ItemService } from 'src/item-module/item.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(repositories.ORDERS_REPOSITORY)
    private readonly orderModel: typeof Order,
    @Inject(REQUEST) private readonly request,
    private readonly ItemService: ItemService,
    ) {}


  async findOrdersByStatus(
    input: FindByStatusOrIdParams
    ): Promise<PlainOrderReturn[] | PlainOrderReturn> {
    const userId = (this.request.user as PlainUserReturn).id;

    const orders = await this.orderModel.findAll({
      where: {
        userId,
        ...(input.id && {id: input.id}),
        ...(input.status && {status: input.status}),
      }
    });

    return input.id && orders
    ? orders[0]
    : input.id && !orders
    ? null
    : orders.map(o => o.toJSON());
  }


  async createOrder(input: CreateOrderParams): Promise<PlainOrderReturn> {

    this.ItemService.validateActiveItems(
      input.itemsIdsWIthQuantity.map(i=>i.itemId)
    );

    const userId = (this.request.user as PlainUserReturn).id;
    
    const itemsWithQuantities = input.itemsIdsWIthQuantity.map(({ itemId, quantity}) => ({
      ...this.ItemService.findItemById(itemId),
      quantity
    }));
    
    const orderBody = {
      itemsSnapshot: itemsWithQuantities,
      userId,
    };

    let newOrder = new Order(orderBody);
    newOrder = await newOrder.save();

    return newOrder;
  }

    async updateStatus(
      id: string,
      status: OrderStatus
    ): Promise<PlainOrderReturn> {

    const userId = (this.request.user as PlainUserReturn).id;
    const order = await this.orderModel.findOne({
      where: { id, userId }
    });

    if(!order) return null;
    const updatedOrder = await order.update({ status });

    return updatedOrder.get({plain: true});
  }
}
