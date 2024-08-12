import { CommonEntity } from 'src/common/common.entity';
import { Order } from 'src/order/entities/order.entity';
import { Return } from 'src/return/entities/return.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stocks')
export class Stock extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  stockId: string;

  @Column({ type: 'float' })
  totalPrice: number;

  @Column()
  expireDate: Date;
  @ManyToOne(() => Order, (order) => order.stock)
  order: Order;
  @ManyToOne(() => Return, (returns) => returns.stock)
  returns: Return;
}
