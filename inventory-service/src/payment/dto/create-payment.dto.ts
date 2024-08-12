import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum PaidEnumType {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

export enum PaymentReason {
  Stock = 'Stock',
  Sale = 'Sale',
  Return = 'Return',
  Order = 'Order',
}
export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  isPaid: string;

  @IsString()
  @IsNotEmpty()
  paymentWay: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  remainPrice: number;

  @IsNotEmpty()
  @IsEnum(PaymentReason)
  reason: string;
}
