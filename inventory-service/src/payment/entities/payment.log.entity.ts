import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments_log')
export class PaymentLog {
  @PrimaryGeneratedColumn('uuid')
  paymentLogId: string;

  @Column()
  paymentId: string;
  @Column()
  invoiceNo: string;

  @Column()
  clientId: string;

  @Column({ type: 'float' })
  totalPrice: number;

  @Column()
  reason: string;

  @Column({ type: 'float' })
  paidAmount: number;

  @Column()
  paymentWay: string;

  @Column()
  isPaid: string;

  @Column()
  createdDate: Date;

  @Column()
  userId: string;
}
