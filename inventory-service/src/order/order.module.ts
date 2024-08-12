import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { StockModule } from 'src/stock/stock.module';
import { UtilityModule } from 'src/utility/utility.module';
import { ProductModule } from 'src/product/product.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    StockModule,
    UtilityModule,
    ProductModule,
    PaymentModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
