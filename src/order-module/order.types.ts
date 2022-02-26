import { Item } from "src/item-module/item.model";
import { User } from "src/user-module/user.model";


export interface ItemWIthQuantity extends Item {
    quantity: number;
};

export interface itemIdWIthQuantity {
    itemId: number;
    quantity: number;
};

export interface CreateOrderParams {
    itemsIdsWIthQuantity: itemIdWIthQuantity[];
}

export interface UpdateOrderParams {
    orderId: string;
    status: OrderStatus;
}

export interface PlainOrderReturn {
    itemsSnapshot: ItemWIthQuantity[];
    status: OrderStatus;
    userId: string;
    user?: User;
    id: string;
}

export enum OrderStatus {
    NEW = 'NEW',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}

export interface FindByStatusOrIdParams {
    status?: OrderStatus,
    id?: string
}