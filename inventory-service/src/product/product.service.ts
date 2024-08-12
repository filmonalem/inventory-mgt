import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UtilityService } from 'src/utility/utility.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly paginationService: UtilityService,
    private readonly categoryService: CategoryService,
  ) {}
  async generateProductCode(createProductDto: CreateProductDto) {
    const { productName, unit, brand } = createProductDto;
    const countProduct = await this.productRepository.count();
    const findProduct = await this.productRepository.find({
      where: { productName, unit, brand },
    });
    if (findProduct) {
      return (
        `${productName.slice(0, 2).toUpperCase() + '0'}` + countProduct + 1
      );
    }
    return `${productName.slice(0, 2).toUpperCase() + '0'}` + countProduct;
  }
  async createProduct(createProductDto: CreateProductDto) {
    const { productName, unit, brand } = createProductDto;

    const checkCategory = await this.categoryService.getCategory(
      createProductDto.categoryId,
    );
    if (!checkCategory) {
      return new NotFoundException('category id  is not found ');
    }
    const checkProduct = await this.productRepository.findOne({
      where: { productName, unit, brand },
    });

    if (checkProduct) {
      return {
        message: 'Product already exists',
      };
    }
    const productCode = await this.generateProductCode(createProductDto);
    const product = this.productRepository.create({
      productCode,
      ...createProductDto,
    });
    return await this.productRepository.save(product);
  }

  async getAllProducts(page = 1, limit = 100) {
    const query = this.productRepository.createQueryBuilder('product');
    return await this.paginationService.paginateAndFetch(query, page, limit);
  }

  async getProduct(productId: string) {
    return await this.productRepository.findOneBy({ productId });
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(productId, updateProductDto);
  }

  async delete(productId: string) {
    return await this.productRepository.delete(productId);
  }
  async searchProducts(searchTerm: string) {
    const query = Object.values(searchTerm);
    return await this.productRepository.find({
      where: {
        productName: Like(`%${query}%`),
        productId: Like(`%${query}%`),
      },
    });
  }
}
