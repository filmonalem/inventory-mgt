import { Stock } from 'src/stock/entities/stock.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

class ReturnItem {
  @Column()
  productId: string;

  @Column('int')
  quantity: number;
}

@Entity()
export class Return {
  @PrimaryGeneratedColumn('uuid')
  returnId: string;

  @Column()
  clientId: string;

  @Column('jsonb')
  products: ReturnItem[];
  @Column()
  status: string;

  @Column()
  reason: string;
  @OneToMany(() => Stock, (stock) => stock.returns)
  stock: Stock;
}
