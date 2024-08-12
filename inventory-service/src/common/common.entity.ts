import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
export enum isPaidEnumType {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}
export abstract class CommonEntity extends BaseEntity {
  @Column()
  paymentId: string;

  @Column()
  productId: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  quantity: number;

  @Column()
  isPaid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', default: 'ETB' })
  currency?: string;
}
