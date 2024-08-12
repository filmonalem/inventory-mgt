import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitDto } from './create-unit.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {
  @IsNotEmpty()
  unitId: string;
}
