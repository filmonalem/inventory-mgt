import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  companyId: string;

  @Column()
  companyName: string;

  @Column()
  companyCode: string;

  @Column()
  companyTypes: string;

  @CreateDateColumn()
  createdAt: Date;
}
