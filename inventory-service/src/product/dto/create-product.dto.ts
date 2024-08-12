import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;
  @IsString()
  @IsNotEmpty()
  unit: string;
  @IsString()
  @IsNotEmpty()
  categoryId: string;
  @IsString()
  @IsNotEmpty()
  brand: string;
}
