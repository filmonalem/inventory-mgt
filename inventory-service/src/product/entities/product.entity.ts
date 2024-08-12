import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Return } from 'src/return/entities/return.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;
  @Column()
  productName: string;
  @Column()
  brand: string;
  @Column()
  productCode: string;
  @Column()
  categoryId: string;
  @Column()
  unit: string;
  @ManyToOne(() => Return, (returns) => returns.products)
  returns: Return;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
