import { StockModule } from './stock/stock.module';
import { SaleModule } from './sale/sale.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { BackupModule } from './backup/backup.module';
import { BackupController } from './backup/backup.controller';
import { BackupService } from './backup/backup.service';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderModule } from './order/order.module';
import { ReturnModule } from './return/return.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';
import { PriceModule } from './price/price.module';
import { CategoryModule } from './category/category.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redisStore as unknown as CacheStore,
      host: 'localhost',
      port: 6379,
    }),
    DatabaseModule,
    StockModule,
    SaleModule,
    BackupModule,
    ProductModule,
    PaymentModule,
    PriceModule,
    OrderModule,
    ReturnModule,
    CategoryModule,
    StripeModule,
  ],
  controllers: [BackupController],
  providers: [BackupService],
})
export class AppModule {}
