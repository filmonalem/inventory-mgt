import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  expireDate: Date;
}
export class CreateSaleDto {
  @IsArray()
  products: Items[];
  @IsString()
  clientId: string;
  @IsOptional()
  @IsNumber()
  amount: number;
  @IsString()
  currency: string;
  @IsString()
  paymentWay: string;
}
