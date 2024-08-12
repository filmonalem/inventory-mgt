import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { isPaidEnumType } from 'src/common/common.entity';

export class Items {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsDate()
  expireDate?: Date;
}

export class CreateStockDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsArray()
  @IsNotEmpty()
  products: Items[];

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsString()
  currency?: string;
  @IsString()
  paymentWay: string;

  @IsString()
  isPaid: isPaidEnumType;
}
