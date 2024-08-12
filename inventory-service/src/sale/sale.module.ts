import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { StockModule } from '../stock/stock.module'; // Importing StockModule
import { SalesService } from './sale.service';
import { PaymentModule } from 'src/payment/payment.module';
import { UtilityModule } from 'src/utility/utility.module';
import { ProductModule } from 'src/product/product.module';
import { SalesController } from './sale.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    StockModule,
    ProductModule,
    PaymentModule,
    UtilityModule,
  ],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SaleModule {}
