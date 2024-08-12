import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  paymentId: string;

  @Column()
  invoiceNo: string;

  @Column()
  clientId: string;

  @Column({ type: 'float' })
  totalPrice: number;

  @Column({ type: 'float' })
  remainPrice: number;

  @Column()
  reason: string;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  paymentWay?: string;

  @Column()
  isPaid: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  // @Column()
  // userId: string;
  @Column()
  paymentIntentId: string;
}
