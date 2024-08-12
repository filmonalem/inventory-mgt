import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { Return } from './entities/return.entity';
import { StockService } from '../stock/stock.service';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class ReturnService {
  constructor(
    @InjectRepository(Return)
    private readonly returnRepository: Repository<Return>,
    private readonly stockService: StockService,
    private readonly paginationService: UtilityService,
  ) {}

  async createReturn(createReturnDto: CreateReturnDto) {
    const { products, clientId, reason } = createReturnDto;

    const newReturn = this.returnRepository.create({
      clientId,
      reason,
      status: 'PENDING',
    });

    try {
      const returnOrder = await this.returnRepository.save(newReturn);

      for (const item of products) {
        await this.stockService.updateStockQuantity(
          item.productId,
          item.quantity,
        );
      }

      returnOrder.status = 'COMPLETED';
      return await this.returnRepository.save(returnOrder);
    } catch (error) {
      newReturn.status = 'FAILED';
      await this.returnRepository.save(newReturn);
      throw new Error(`Failed to process return: ${error.message}`);
    }
  }

  async getAllReturns(page = 1, limit = 100, searchQuery: string) {
    if (searchQuery) {
      const searchData = await this.searchReturn(searchQuery);
      return searchData;
    }
    const query = this.returnRepository.createQueryBuilder('return');
    return await this.paginationService.paginateAndFetch(query, page, limit);
  }

  async getReturn(returnId: string) {
    const returnOrder = await this.returnRepository.findOneBy({ returnId });
    if (!returnOrder) {
      return new NotFoundException(`Return with ID ${returnId} not found`);
    }
    return returnOrder;
  }

  async updateReturn(returnId: string, updateReturnDto: UpdateReturnDto) {
    const returnOrder = await this.returnRepository.findOneBy({ returnId });
    if (!returnOrder) {
      throw new NotFoundException(`Return with ID ${returnId} not found`);
    }

    Object.assign(returnOrder, updateReturnDto);
    return await this.returnRepository.save(returnOrder);
  }

  async searchReturn(searchTerm: string) {
    return this.returnRepository.find({
      where: [
        { returnId: Like(`%${searchTerm}%`) },
        { clientId: Like(`%${searchTerm}%`) },
        { reason: Like(`%${searchTerm}%`) },
      ],
    });
  }
}
