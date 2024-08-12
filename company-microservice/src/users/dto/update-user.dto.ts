import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/auth/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  userId: string;
  email?: string;
  password?: string;
  isActive: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  role?: Role;
}
