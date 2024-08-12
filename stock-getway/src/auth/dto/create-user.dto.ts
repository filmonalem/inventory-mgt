import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  role: Role;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
