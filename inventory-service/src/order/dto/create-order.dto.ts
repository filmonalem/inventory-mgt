import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class items {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsArray()
  products: items[];
}
