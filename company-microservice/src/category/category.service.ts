import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Like, Repository } from 'typeorm';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly paginationService: UtilityService,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const checkCategory = await this.categoryRepository.findOneBy({
      categoryName: createCategoryDto.categoryName,
    });
    if (checkCategory) {
      return new NotFoundException(304, 'category is already created');
    }

    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async getAllCategory(page = 1, limit = 100) {
    const query = this.categoryRepository.createQueryBuilder('category');

    return await this.paginationService.paginateAndFetch(query, page, limit);
  }

  async getCategory(categoryId: string) {
    return await this.categoryRepository.findOne({ where: { categoryId } });
  }

  async updateCategory(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryRepository.update(categoryId, updateCategoryDto);
  }

  async searchCategories(searchTerm: string) {
    const query = Object.values(searchTerm);
    return await this.categoryRepository.find({
      where: { categoryName: Like(`%${query}%`) },
    });
  }
}
