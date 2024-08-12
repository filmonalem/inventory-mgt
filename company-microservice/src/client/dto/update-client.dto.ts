import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsNotEmpty()
  clientId: string;
}
