import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceDto } from './create-price.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePriceDto extends PartialType(CreatePriceDto) {
  @IsNotEmpty()
  priceId: string;
}
