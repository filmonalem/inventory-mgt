import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherService } from './voucher.service';
import { Payment } from 'src/payment/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [VoucherService],
  exports: [VoucherService],
})
export class VoucherModule {}
