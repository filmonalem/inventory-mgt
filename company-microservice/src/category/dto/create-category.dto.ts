import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;
  @IsString()
  @IsNotEmpty()
  note: string;
  @IsString()
  @IsNotEmpty()
  batch: string;
}
