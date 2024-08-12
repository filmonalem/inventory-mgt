import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
