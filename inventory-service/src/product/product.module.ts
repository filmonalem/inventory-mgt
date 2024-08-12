import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UtilityModule } from 'src/utility/utility.module';
import { Category } from 'src/category/entities/category.entity';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    UtilityModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, CategoryService],
  exports: [ProductService],
})
export class ProductModule {}
