import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { StockService } from '../stock/stock.service';
import { UtilityService } from 'src/utility/utility.service';
import { ProductService } from 'src/product/product.service';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly stockService: StockService,
    private readonly paginationService: UtilityService,
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { products, clientId } = createOrderDto;

    const newOrder = this.orderRepository.create({
      clientId,
      status: 'PENDING',
    });
    const order = await this.orderRepository.save(newOrder);

    try {
      for (const item of products) {
        await this.stockService.updateStockQuantity(
          item.productId,
          -item.quantity,
        );
      }

      order.status = 'COMPLETED';
      return await this.orderRepository.save(order);
    } catch (error) {
      order.status = 'FAILED';
      await this.orderRepository.save(order);
      throw error;
    }
  }

  async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ orderId });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }

  async getOrder(orderId: string) {
    const order = await this.orderRepository.findOneBy({ orderId });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    return order;
  }

  async getAllOrders(page = 1, limit = 100) {
    const query = this.orderRepository.createQueryBuilder('order');
    return await this.paginationService.paginateAndFetch(query, page, limit);
  }

  async cancelOrder(orderId: string) {
    const order = await this.orderRepository.findOneBy({ orderId });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    for (const item of order.stock) {
      await this.stockService.updateStockQuantity(
        item.productId,
        item.quantity,
      );
    }

    order.status = 'CANCELLED';
    return await this.orderRepository.save(order);
  }
  // async cancelOrder(orderId: string) {
  //   const order = await this.orderRepository.findOneBy({ orderId });
  //   if (!order) {
  //     throw new NotFoundException(`Order with ID ${orderId} not found`);
  //   }

  //   if (!Array.isArray(order.products)) {
  //     throw new Error(`Order products is not an array`);
  //   }

  //   order.status = 'CANCELLED';
  //   return await this.orderRepository.save(order);
  // }

  async searchOrder(searchTerm: string) {
    const query = Object.values(searchTerm);
    return this.orderRepository.find({
      where: {
        orderId: Like(`%${query}%`),
      },
    });
  }
}
