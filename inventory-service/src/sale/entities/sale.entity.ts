import { CommonEntity } from 'src/common/common.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sales')
export class Sale extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  saleId: string;
}
