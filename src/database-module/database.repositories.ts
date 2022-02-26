import { Order } from "src/order-module/order.model";
import { User } from "src/user-module/user.model";

export enum repositories {
    USERS_REPOSITORY = 'USERS_REPOSITORY',
    ORDERS_REPOSITORY = 'ORDERS_REPOSITORY',
};

export const repositoriesModel = [
    {
        provide: repositories.USERS_REPOSITORY,
        useValue: User
    },
    {
        provide: repositories.ORDERS_REPOSITORY,
        useValue: Order
    },
];