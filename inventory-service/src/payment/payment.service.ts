import { VoucherService } from 'src/voucher/voucher.service';
import { HttpException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Like, Repository } from 'typeorm';
import { PaymentLog } from './entities/payment.log.entity';
import { UtilityService } from 'src/utility/utility.service';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(PaymentLog)
    private readonly paymentLogRepository: Repository<PaymentLog>,
    private readonly voucherService: VoucherService,
    private readonly paginationService: UtilityService,
    private readonly stripeService: StripeService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { reason, amount, currency } = createPaymentDto;
    if (!currency) {
      throw new HttpException('Currency is required', 400);
    }
    const paymentIntent = await this.stripeService.createPaymentIntent(
      amount,
      currency,
    );

    const prefix = await this.checkReason(reason);
    const invoiceNo = await this.voucherService.generateVoucher(prefix);
    const newPayment = this.paymentRepository.create({
      reason,
      invoiceNo,
      paymentIntentId: paymentIntent.id,
      ...createPaymentDto,
    });
    return await this.paymentRepository.save(newPayment);
  }

  async getAllPayments(page = 1, limit = 100) {
    const query = this.paymentRepository.createQueryBuilder('payment');
    return await this.paginationService.paginateAndFetch(query, page, limit);
  }

  async getPayment(paymentId: string) {
    return await this.paymentRepository.findOneBy({ paymentId });
  }

  async updatePayment(paymentId: string, updatePaymentDto: UpdatePaymentDto) {
    const findIdPayment = await this.paymentRepository.findOneBy({
      paymentId,
    });

    if (!findIdPayment)
      return new HttpException(`Payment id is not available`, 404);

    const saveLog = await this.logPayment(findIdPayment.paymentId);
    if (saveLog) {
      return await this.paymentRepository.update(paymentId, updatePaymentDto);
    }
  }

  async logPayment(paymentId: string) {
    const logPayment = await this.paymentRepository.findOneBy({ paymentId });
    const newLog = this.paymentLogRepository.create(logPayment);
    return await this.paymentLogRepository.save(newLog);
  }

  async searchPayment(searchTerm: string) {
    const query = Object.values(searchTerm);
    return await this.paymentRepository.find({
      where: {
        paymentId: Like(`%${query}%`),
      },
    });
  }
  async getAllPaymentLog(page = 1, limit = 100) {
    const query = this.paymentLogRepository.createQueryBuilder('paymentLog');
    return await this.paginationService.paginateAndFetch(query, page, limit);
  }

  async checkReason(reason: string) {
    let prefix: string;
    if (reason === 'Stock') {
      prefix = 'STK';
    } else if (reason === 'Sale') {
      prefix = 'SAL';
    } else if (reason === 'Order') {
      prefix = 'ORD';
    } else {
      prefix = 'RET';
    }
    return prefix;
  }
}
