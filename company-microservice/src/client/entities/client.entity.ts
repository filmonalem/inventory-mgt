import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ClientType {
  Customer = 'customer',
  Supplier = 'supplier',
}

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  clientId: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  address?: string;

  @Column({ type: 'enum', enum: ClientType })
  clientType: string;

  @Column()
  tinNumber?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'date' })
  createdDate: Date;

  // @Column()
  // userId: string;
}
