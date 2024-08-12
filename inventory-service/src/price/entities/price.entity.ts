import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn('uuid')
  priceId: string;
  @Column()
  productId: string;
  @Column({ type: 'float' })
  price: number;
}
