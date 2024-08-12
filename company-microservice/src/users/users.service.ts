import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto:', createUserDto); // Debugging line
    const checkUser = await this.findOneUser(createUserDto.email);
    if (checkUser) {
      throw new UnauthorizedException('this email is taken');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findOneUser(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findAllUsers() {
    return await this.userRepository.find();
  }

  async findOneUserById(userId: string) {
    return await this.userRepository.findOne({ where: { userId } });
  }

  async findUserByResetToken(resetToken: string) {
    return await this.userRepository.findOne({ where: { resetToken } });
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneUser(updateUserDto.userId);
    if (!user) {
      throw new UnauthorizedException('this user is not found');
    }
    await this.userRepository.update(userId, updateUserDto);
  }
}
