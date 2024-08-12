import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @MessagePattern('searchCategory')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @MessagePattern('getAllCategory')
  async getAllCategory(@Query() page = 1, limit = 100) {
    return await this.categoryService.getAllCategory(page, limit);
  }

  @Get(':id')
  @MessagePattern('getCategory')
  async getCategory(@Param('id') categoryId: string) {
    return await this.categoryService.getCategory(categoryId);
  }

  @Patch(':id')
  @MessagePattern('updateCategory')
  async updateCategory(
    @Param('id') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(
      categoryId,
      updateCategoryDto,
    );
  }

  @Get('search')
  @MessagePattern('searchCategory')
  async searchCategories(@Query() searchTerm: string) {
    return await this.categoryService.searchCategories(searchTerm);
  }
}
