import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { PaymentLog } from './entities/payment.log.entity';
import { UtilityModule } from 'src/utility/utility.module';
import { VoucherModule } from 'src/voucher/voucher.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentLog]),
    UtilityModule,
    VoucherModule,
    StripeModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
