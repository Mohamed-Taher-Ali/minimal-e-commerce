import { Table, Column, Model, PrimaryKey, Default, DataType, Unique, Length, IsEmail } from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @Column
  name: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Length({
    min: 5,
    msg: 'You must enter password !'
  })
  @Column
  password: string;
};