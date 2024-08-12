import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnitDto {
  @IsNotEmpty()
  @IsString()
  unitName: string;
}
