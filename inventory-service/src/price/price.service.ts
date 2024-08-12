import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Like, Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    private readonly productService: ProductService,
    private readonly paginationService: UtilityService,
  ) {}
  async createPrice(createPriceDto: CreatePriceDto) {
    const { productId } = createPriceDto;
    const checkProduct = this.productService.getProduct(
      createPriceDto.productId,
    );
    if (!checkProduct) {
      return new NotFoundException(`product is not available`);
    }
    const checkPrice = this.priceRepository.findOneBy({ productId });
    if (checkPrice) {
      return {
        message: 'price is already created ',
      };
    }
    const payment = this.priceRepository.create(createPriceDto);
    return await this.priceRepository.save(payment);
  }

  async getAllPrices(page = 1, limit = 100) {
    const query = this.priceRepository.createQueryBuilder('price');
    return await this.paginationService.paginateAndFetch(query, page, limit);
  }

  async getPrice(priceId: string) {
    return await this.priceRepository.findOneBy({ priceId });
  }

  async updatePrice(priceId: string, updatePriceDto: UpdatePriceDto) {
    const checkPrice = this.getPrice(priceId);
    if (!checkPrice)
      return new NotFoundException(
        `Price with this id ${priceId} is not available`,
      );
    return await this.priceRepository.update(priceId, updatePriceDto);
  }
  async searchPrices(searchTerm: string) {
    const query = Object.values(searchTerm);
    return await this.priceRepository.find({
      where: {
        priceId: Like(`%${query}%`),
      },
    });
  }
}
