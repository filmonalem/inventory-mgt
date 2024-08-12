import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}
  @Post()
  @MessagePattern('login')
  async login(@Body() authDto: AuthDto) {
    this.logger.log('Received login request with data:', authDto);
    return this.authService.login(authDto);
  }
  @Post()
  @MessagePattern('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Received signup request with data:', createUserDto);
    return await this.authService.signup(createUserDto);
  }
  @Get()
  @MessagePattern('getAllUser')
  async getAllUser() {
    this.logger.log('Received getAllUser request');
    return this.authService.getAllUser();
  }
  @Post()
  @MessagePattern('forgotPassword')
  async forgotPassword(@Body() email: string) {
    this.logger.log('Received forgotPassword request with email:', email);
    return await this.authService.forgotPassword(email);
  }
  @Post()
  @MessagePattern('resetPassword')
  async resetPassword(
    @Body() data: { resetToken: string; newPassword: string },
  ) {
    this.logger.log('Received resetPassword request with data:', data);
    return this.authService.resetPassword(data.resetToken, data.newPassword);
  }
  @Post()
  @MessagePattern('suspendUser')
  async suspendUser(@Body() userId: string) {
    this.logger.log('Received suspendUser request with userId:', userId);
    return this.authService.suspendUser(userId);
  }
  @Post()
  @MessagePattern('reactivateUser')
  async reactivateUser(@Body() userId: string) {
    this.logger.log('Received reactivateUser request with userId:', userId);
    return await this.authService.reactivateUser(userId);
  }
}
