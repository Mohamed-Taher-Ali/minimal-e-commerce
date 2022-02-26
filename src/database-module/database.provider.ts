import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { config } from 'src/app-configs/config';
import { Order } from 'src/order-module/order.model';
import { User } from '../user-module/user.model';

const models = [
    User,
    Order
];

export const databaseProvider = {
    provide: 'SEQUELIZE',
    useFactory: async () => {
        const sequelize = new Sequelize({
            ...config.database as SequelizeOptions,
            logging: false,
        });
        sequelize.addModels(models);
        await sequelize.sync();
        return sequelize;
    },
};