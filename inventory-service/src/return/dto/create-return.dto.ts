import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
class items {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateReturnDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;
  @IsString()
  @IsNotEmpty()
  reason: string;
  @IsString()
  @IsNotEmpty()
  status: string;
  @IsArray()
  products: items[];
}
