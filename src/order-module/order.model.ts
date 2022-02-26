import { Table, Column, Model, PrimaryKey, Default, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/user-module/user.model';
import { ItemWIthQuantity, OrderStatus } from './order.types';

@Table
export class Order extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.UUID, onDelete: 'CASCADE' })
  userId: string;

  @BelongsTo(() => User)
  user?: User;

  @AllowNull(false)
  @Column({ type: DataType.JSONB })
  itemsSnapshot: ItemWIthQuantity[];

  @AllowNull(false)
  @Default(OrderStatus.NEW)
  @Column({ type: DataType.STRING })
  status: OrderStatus;
};