import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @MessagePattern('create_product')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  @MessagePattern('get_all_products')
  async getAllProducts(
    @Query() page: number = 1,
    @Query() limit: number = 100,
  ) {
    return await this.productService.getAllProducts(page, limit);
  }

  @Get(':id')
  @MessagePattern('get_product_by_id')
  async getProduct(@Param('id') productId: string) {
    return await this.productService.getProduct(productId);
  }

  @MessagePattern('updateProduct')
  @Patch(':id')
  async update(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<any> {
    return await this.productService.updateProduct(productId, updateProductDto);
  }

  @Get('search')
  @MessagePattern('searchProduct')
  async searchProducts(@Query() searchTerm: string) {
    return await this.productService.searchProducts(searchTerm);
  }
}
