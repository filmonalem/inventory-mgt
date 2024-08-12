import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../payment/entities/payment.entity'; // Adjusted path

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async generateDate() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(2, 3);
    return year;
  }

  async generateVoucher(prefix: string) {
    const getYear = await this.generateDate();
    let paymentCount = '';
    const paymentData = await this.paymentRepository.count();
    if (paymentData) {
      const generatedNumber = `${paymentData + 1}`;
      if (generatedNumber.length === 1) {
        paymentCount = `${prefix + '-' + '0000000' + generatedNumber + '-' + getYear}`;
      } else if (generatedNumber.length === 2) {
        paymentCount = `${prefix + '-' + '000000' + generatedNumber + '-' + getYear}`;
      } else if (generatedNumber.length === 3) {
        paymentCount = `${prefix + '-' + '00000' + generatedNumber + '-' + getYear}`;
      } else if (generatedNumber.length === 4) {
        paymentCount = `${prefix + '-' + '0000' + generatedNumber + '-' + getYear}`;
      } else if (generatedNumber.length === 5) {
        paymentCount = `${prefix + '-' + '000' + generatedNumber + '-' + getYear}`;
      } else if (generatedNumber.length === 6) {
        paymentCount = `${prefix + '-' + '00' + generatedNumber + '-' + getYear}`;
      } else if (generatedNumber.length === 7) {
        paymentCount = `${prefix + '-' + '0' + generatedNumber + '-' + getYear}`;
      } else if (generatedNumber.length === 8) {
        paymentCount = `${prefix + '-' + generatedNumber + '-' + getYear}`;
      }
    } else {
      paymentCount = `${prefix + '-' + '0000000' + (paymentData + 1) + '-' + getYear}`;
    }
    return paymentCount;
  }
}
