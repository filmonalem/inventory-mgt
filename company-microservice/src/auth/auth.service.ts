import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { EmailService } from 'src/mailer/mailer.service';
import * as crypto from 'crypto';
import { Role } from './role.enum';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: EmailService,
  ) {}

  async validateUser(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.usersService.findOneUser(email);
    if (!user) {
      throw new UnauthorizedException("user email doesn't exist");
    }
    if (user.isActive === false) {
      throw new UnauthorizedException('user is deactivated');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid password');
    } else {
      const payload = {
        username: user.username,
        sub: user.userId,
        status: user.isActive,
        role: user.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
        payload,
      };
    }
  }

  async login(authDto: AuthDto) {
    this.logger.log(`Login request for email: ${authDto.email}`);
    return await this.validateUser(authDto);
  }

  async signup(createUserDto: CreateUserDto) {
    this.logger.log(`Signup request for email: ${createUserDto.email}`);
    return await this.usersService.create(createUserDto);
  }

  async forgotPassword(email: string) {
    this.logger.log(`Forgot password request for email: ${email}`);
    const user = await this.usersService.findOneUser(email);
    if (!user) {
      this.logger.error(`User with email ${email} not found`);
      throw new UnauthorizedException('User not found');
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    const updateUserDto: UpdateUserDto = {
      userId: user.userId,
      isActive: user.isActive,
      resetToken: user.resetToken,
      resetTokenExpiry: user.resetTokenExpiry,
    };
    await this.usersService.updateUser(user.userId, updateUserDto);
    await this.mailerService.sendEmail(
      'filmonalem321@getMaxListeners.com',
      'Password Reset',
      `Reset your password using this token: ${resetToken}`,
    );
    this.logger.log(`Password reset token sent to email: ${email}`);
    return { message: 'Password reset token sent' };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    this.logger.log(`Reset password request with token: ${resetToken}`);
    const user = await this.usersService.findUserByResetToken(resetToken);
    if (!user || user.resetTokenExpiry < new Date()) {
      this.logger.error(`Invalid or expired reset token: ${resetToken}`);
      throw new UnauthorizedException('Invalid or expired reset token');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    const updateUserDto: UpdateUserDto = {
      userId: user.userId,
      isActive: user.isActive,
      password: user.password,
      resetToken: null,
      resetTokenExpiry: null,
    };
    await this.usersService.updateUser(user.userId, updateUserDto);
    this.logger.log(
      `Password reset successfully for user with token: ${resetToken}`,
    );
    return { message: 'Password reset successful' };
  }

  async suspendUser(userId: string) {
    this.logger.log(`Suspend user request for userId: ${userId}`);
    const user = await this.usersService.findOneUserById(userId);
    if (!user) {
      this.logger.error(`User with userId ${userId} not found`);
      throw new UnauthorizedException('User not found');
    }
    user.isActive = false;
    const updateUserDto: UpdateUserDto = {
      userId: user.userId,
      isActive: user.isActive,
    };
    await this.usersService.updateUser(userId, updateUserDto);
    this.logger.log(`User with userId ${userId} suspended successfully`);
    return { message: 'User suspended successfully' };
  }

  async reactivateUser(userId: string) {
    this.logger.log(`Reactivate user request for userId: ${userId}`);
    const user = await this.usersService.findOneUserById(userId);
    if (!user) {
      this.logger.error(`User with userId ${userId} not found`);
      throw new UnauthorizedException('User not found');
    }
    user.isActive = true;
    const updateUserDto: UpdateUserDto = {
      userId: user.userId,
      isActive: user.isActive, // Include the isActive property
    };
    await this.usersService.updateUser(userId, updateUserDto);
    this.logger.log(`User with userId ${userId} reactivated successfully`);
    return { message: 'User reactivated successfully' };
  }

  async changeUserRole(userId: string, newRole: Role) {
    this.logger.log(
      `Change role request for userId: ${userId} to role: ${newRole}`,
    );
    const user = await this.usersService.findOneUserById(userId);
    if (!user) {
      this.logger.error(`User with userId ${userId} not found`);
      throw new UnauthorizedException('User not found');
    }
    user.role = newRole;
    const updateUserDto: UpdateUserDto = {
      userId: user.userId,
      isActive: user.isActive, // Include the isActive property
      role: newRole,
    };
    await this.usersService.updateUser(userId, updateUserDto);
    this.logger.log(
      `User with userId ${userId} role changed to ${newRole} successfully`,
    );
    return { message: 'User role changed successfully' };
  }

  async getAllUser() {
    this.logger.log('Get all users request');
    return await this.usersService.findAllUsers();
  }
}
