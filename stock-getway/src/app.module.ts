import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { UnitModule } from './unit/unit.module';
import { ProductModule } from './product/product.module';
import { PriceModule } from './price/price.module';
import { CompanyModule } from './company/company.module';
import { PaymentModule } from './payments/payment.module';
import { TransactionModule } from './transaction/transaction.module';
import { ClientModule } from './client/client.module';
import { StockModule } from './stock/stock.module';
import { SalesModule } from './sales/sales.module';
import { OrderModule } from './order/order.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { ReturnModule } from './return/return.module';

@Module({
  imports: [
    CategoryModule,
    UnitModule,
    ProductModule,
    PriceModule,
    CompanyModule,
    PaymentModule,
    TransactionModule,
    ClientModule,
    StockModule,
    SalesModule,
    OrderModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'COMPANY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'company_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'payment_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ReturnModule,
  ],
})
export class AppModule {}
