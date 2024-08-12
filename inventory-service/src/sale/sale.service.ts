// import { HttpException, Injectable } from '@nestjs/common';
// import { CreateSaleDto } from './dto/create-sale.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Sale } from './entities/sale.entity';
// import { Between, Like, Repository } from 'typeorm';
// import { StockService } from 'src/stock/stock.service';
// import { PaymentService } from 'src/payment/payment.service';
// import { ProductService } from 'src/product/product.service';
// import { UtilityService } from 'src/utility/utility.service';

// @Injectable()
// export class SalesService {
//   constructor(
//     @InjectRepository(Sale)
//     private readonly saleRepository: Repository<Sale>,
//     private readonly paymentService: PaymentService,
//     private readonly productService: ProductService,
//     private readonly paginationService: UtilityService,
//     private readonly stockService: StockService,
//   ) {}

//   async createSale(createSaleDto: CreateSaleDto) {
//     const { products, clientId, amount, currency, paymentWay } = createSaleDto; // Destructure currency
//     for (const item of products) {
//       const stockAvailable = await this.remainStockAvailable(
//         item.productId,
//         item.quantity,
//       );
//       if (!stockAvailable) {
//         throw new HttpException(
//           `Product with ID ${item.productId} is out of stock.`,
//           400,
//         );
//       }
//     }

//     const totalPrice = await this.recalculatePrice(createSaleDto);
//     const paidPrice = amount ? amount : 0;
//     const checkPaid = amount === 0 ? 'PAID' : 'UNPAID';

//     const newPayment = await this.paymentService.createPayment({
//       clientId,
//       totalPrice,
//       remainPrice: totalPrice - amount,
//       amount: paidPrice,
//       isPaid: checkPaid,
//       reason: 'Sale',
//       currency,
//       paymentWay,
//     });

//     const paymentId = newPayment.paymentId;

//     if (paymentId) {
//       const productData = await this.productService.getAllProducts();
//       const productExists = (productId: string) =>
//         productData.data.some((product) => product.productId === productId);

//       const savePromises = products.map(async (item) => {
//         if (
//           productExists(item.productId) &&
//           (await this.remainStockAvailable(item.productId, item.quantity))
//         ) {
//           const sale = this.saleRepository.create({
//             paymentId: paymentId,
//             productId: item.productId,
//             quantity: item.quantity,
//             price: item.price,
//             isPaid: amount ? 'PAID' : 'UNPAID',
//           });
//           return await this.saleRepository.save(sale);
//         } else {
//           throw new Error(`Product with ID ${item.productId} does not exist.`);
//         }
//       });

//       try {
//         return await Promise.all(savePromises);
//       } catch (error) {
//         console.error(error.message);
//         throw error;
//       }
//     } else {
//       throw new Error('Failed to create payment.');
//     }
//   }

//   async recalculatePrice(createSaleDto: CreateSaleDto) {
//     const { products } = createSaleDto;
//     let total = 0;
//     products.forEach((product) => {
//       total += product.price * product.quantity; // Ensure correct total calculation
//     });
//     return total;
//   }

//   async remainStockAvailable(
//     productId: string,
//     quantity: number,
//   ): Promise<boolean> {
//     const totalSale = await this.getTotalOneProducts(productId);
//     const totalStock =
//       await this.stockService.getOneTotalRemainStock(productId);
//     // const remainQty = totalStock - totalSale;

//     if (totalSale + quantity > totalStock) {
//       return false;
//     }
//     return true;
//   }

//   async getAllSales(page = 1, limit = 100) {
//     const query = this.saleRepository.createQueryBuilder('sales');
//     return await this.paginationService.paginateAndFetch(query, page, limit);
//   }

//   async getSale(productId: string): Promise<Sale[]> {
//     return await this.saleRepository.find({
//       where: { productId },
//       relations: ['product'],
//     });
//   }

//   async getTotalOneProducts(productId: string) {
//     let total = 0;
//     const product = await this.saleRepository.find({
//       where: { productId },
//     });
//     product.map((product) => {
//       total += product.quantity;
//     });
//     return total;
//   }

//   async searchSales(searchTerm: string) {
//     const query = Object.values(searchTerm);
//     return await this.saleRepository.find({
//       where: {
//         saleId: Like(`%${query}%`),
//       },
//     });
//   }

//   async getDailySales(): Promise<Sale[]> {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);
//     return await this.saleRepository.find({
//       where: {
//         createdAt: Between(today, tomorrow),
//       },
//       relations: ['product'],
//     });
//   }
// }
import { HttpException, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Between, Like, Repository } from 'typeorm';
import { StockService } from 'src/stock/stock.service';
import { PaymentService } from 'src/payment/payment.service';
import { ProductService } from 'src/product/product.service';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    private readonly paymentService: PaymentService,
    private readonly productService: ProductService,
    private readonly paginationService: UtilityService,
    private readonly stockService: StockService,
  ) {}

  async createSale(createSaleDto: CreateSaleDto) {
    const {
      products,
      clientId,
      amount = 0,
      currency = 'ETB',
      paymentWay,
    } = createSaleDto;

    // Verify stock availability
    for (const item of products) {
      const stockAvailable = await this.stockService.remainStockAvailable(
        item.productId,
        item.quantity,
      );
      if (!stockAvailable) {
        throw new HttpException(
          `Product with ID ${item.productId} is out of stock.`,
          400,
        );
      }
    }

    const totalPrice = await this.recalculatePrice(createSaleDto);
    const paidPrice = amount;
    const isPaid = paidPrice === totalPrice ? 'PAID' : 'UNPAID';

    // Create payment
    const newPayment = await this.paymentService.createPayment({
      clientId,
      totalPrice,
      remainPrice: totalPrice - paidPrice,
      amount: paidPrice,
      isPaid,
      reason: 'Sale',
      currency,
      paymentWay,
    });

    const paymentId = newPayment.paymentId;
    if (!paymentId) {
      throw new HttpException('Failed to create payment.', 500);
    }

    // Process sale and update stock
    const productData = await this.productService.getAllProducts();
    const productExists = (productId: string) =>
      productData.data.some((product) => product.productId === productId);

    const savePromises = products.map(async (item) => {
      if (
        productExists(item.productId) &&
        (await this.stockService.remainStockAvailable(
          item.productId,
          item.quantity,
        ))
      ) {
        // Deduct quantity from stock
        await this.stockService.updateStockQuantity(
          item.productId,
          -item.quantity,
        );

        // Save sale record
        const sale = this.saleRepository.create({
          paymentId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          isPaid,
        });
        return await this.saleRepository.save(sale);
      } else {
        throw new HttpException(
          `Product with ID ${item.productId} does not exist or insufficient stock.`,
          400,
        );
      }
    });

    try {
      return await Promise.all(savePromises);
    } catch (error) {
      console.error(error.message);
      throw new HttpException('Failed to process sale.', 500);
    }
  }

  async recalculatePrice(createSaleDto: CreateSaleDto) {
    const { products } = createSaleDto;
    if (!products || !Array.isArray(products)) {
      throw new HttpException(
        'Products array is not defined or not an array.',
        400,
      );
    }
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }

  async getAllSales(page = 1, limit = 100) {
    const query = this.saleRepository.createQueryBuilder('sales');
    return await this.paginationService.paginateAndFetch(query, page, limit);
  }

  async getSale(productId: string): Promise<Sale[]> {
    return await this.saleRepository.find({
      where: { productId },
      relations: ['product'],
    });
  }

  async getTotalOneProducts(productId: string) {
    const sales = await this.saleRepository.find({
      where: { productId },
    });
    return sales.reduce((total, sale) => total + sale.quantity, 0);
  }

  async searchSales(searchTerm: string) {
    return this.saleRepository.find({
      where: {
        saleId: Like(`%${searchTerm}%`),
      },
    });
  }

  async getDailySales(): Promise<Sale[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return this.saleRepository.find({
      where: {
        createdAt: Between(today, tomorrow),
      },
      relations: ['product'],
    });
  }
}
