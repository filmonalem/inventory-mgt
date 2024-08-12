import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;
  @Column()
  categoryName: string;
  @Column()
  note: string;
  @Column()
  batch: string;
}
