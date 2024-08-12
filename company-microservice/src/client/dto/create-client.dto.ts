import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ClientType } from '../entities/client.entity';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsPhoneNumber('ET')
  phone: string;

  @IsString()
  address?: string;

  @IsEnum(ClientType)
  @IsNotEmpty()
  clientType: ClientType;

  @IsString()
  tinNumber?: string;
  // @IsString()
  // userId?: string;
}
