import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  unitId: string;
  @Column()
  unitName: string;
}
