import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePriceDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
