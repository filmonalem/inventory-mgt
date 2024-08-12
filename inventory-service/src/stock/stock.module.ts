import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { UtilityModule } from 'src/utility/utility.module';
import { PaymentModule } from 'src/payment/payment.module';
import { ProductModule } from 'src/product/product.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    CacheModule.register(),
    UtilityModule,
    PaymentModule,
    ProductModule,
  ],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
