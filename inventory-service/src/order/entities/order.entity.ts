import { Stock } from 'src/stock/entities/stock.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @Column()
  clientId: string;

  @Column()
  status: string;

  @OneToMany(() => Stock, (stock) => stock.order)
  stock: Stock[];
}
