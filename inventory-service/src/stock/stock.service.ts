import {
  Inject,
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Like, Repository } from 'typeorm';
import { UtilityService } from 'src/utility/utility.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ProductService } from 'src/product/product.service';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    private readonly paginationService: UtilityService,
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async createStock(createStockDto: CreateStockDto) {
    const {
      products,
      clientId,
      amount,
      currency = 'ETB',
      paymentWay,
    } = createStockDto;
    const totalPrice = await this.recalculatePrice(createStockDto);
    const paidPrice = amount || totalPrice;
    const isPaid = paidPrice === totalPrice ? 'PAID' : 'UNPAID';
    const newPayment = await this.paymentService.createPayment({
      clientId,
      totalPrice,
      remainPrice: totalPrice - paidPrice,
      amount: paidPrice,
      isPaid,
      reason: 'stock',
      currency,
      paymentWay,
    });

    const paymentId = newPayment.paymentId;
    if (paymentId) {
      const productData = await this.productService.getAllProducts();
      const productExists = (productId: string) =>
        productData.data.some((product) => product.productId === productId);

      const savePromises = products.map(async (item) => {
        if (productExists(item.productId)) {
          const stock = this.stockRepository.create({
            paymentId: paymentId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            totalPrice: item.price * item.quantity,
            expireDate: item.expireDate,
            isPaid,
            currency,
          });
          return await this.stockRepository.save(stock);
        } else {
          throw new Error(`Product with ID ${item.productId} does not exist.`);
        }
      });

      try {
        return await Promise.all(savePromises);
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    } else {
      throw new Error('Failed to create payment.');
    }
  }

  async recalculatePrice(createStockDto: CreateStockDto) {
    const { products } = createStockDto;
    if (!products || !Array.isArray(products)) {
      throw new Error('Products array is not defined or not an array.');
    }
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  }

  async remainStockAvailable(productId: string, quantity: number) {
    const totalStock = await this.getOneTotalRemainStock(productId);
    return totalStock >= quantity;
  }

  async getTotalSaleForProduct(productId: string): Promise<number> {
    let total = 0;
    const products = await this.stockRepository.find({
      where: { productId },
    });
    products.forEach((product) => {
      total += product.quantity;
    });
    return total;
  }

  async getOneTotalRemainStock(productId: string): Promise<number> {
    let total = 0;
    const stocks = await this.stockRepository.find({
      where: { productId },
    });
    stocks.forEach((stock) => {
      total += stock.quantity;
    });
    return total;
  }

  async getAllStock(page = 1, limit = 100) {
    const cacheKey = `get_AllStock_cache`;
    const cachedData = await this.cacheManager.get<any>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const query = this.stockRepository.createQueryBuilder('stock');
    const data = await this.paginationService.paginateAndFetch(
      query,
      page,
      limit,
    );
    await this.cacheManager.set(cacheKey, data, 100);
    return data;
  }

  async getStock(stockId: string) {
    const cacheKey = `getStock_${stockId}`;
    const cachedData = await this.cacheManager.get<Stock>(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const data = await this.stockRepository.findOneBy({ stockId });
    if (!data) {
      throw new NotFoundException(`Stock with ID ${stockId} not found.`);
    }
    await this.cacheManager.set(cacheKey, data, 100);
    return data;
  }

  async updateStock(stockId: string, updateStockDto: UpdateStockDto) {
    const checkStock = await this.stockRepository.findOneBy({ stockId });
    if (!checkStock) {
      throw new NotFoundException(`Stock with ID ${stockId} not found.`);
    }
    await this.stockRepository.update(stockId, updateStockDto);
    return this.stockRepository.findOneBy({ stockId });
  }

  async searchStock(searchTerm: string) {
    const cacheKey = `search_stock_${searchTerm}`;
    const cachedData = await this.cacheManager.get<any>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const data = await this.stockRepository.find({
      where: {
        stockId: Like(`%${searchTerm}%`),
      },
    });

    await this.cacheManager.set(cacheKey, data, 100);
    return data;
  }

  async updateStockQuantity(productId: string, quantityChange: number) {
    const stock = await this.stockRepository.findOneBy({ productId });
    if (!stock) {
      throw new NotFoundException(
        `Stock with product ID ${productId} not found`,
      );
    }
    stock.quantity += quantityChange;
    if (stock.quantity < 0) {
      throw new HttpException(
        `Insufficient stock for product ID ${productId}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.stockRepository.save(stock);
  }
}
