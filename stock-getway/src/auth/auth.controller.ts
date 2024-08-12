import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject('AUTH_SERVICE') private readonly authProxy: ClientProxy,
  ) {}

  @Post('login')
  login(@Body() data: any): Observable<any> {
    this.logger.log('Handling login request with data:', data);
    return this.authProxy.send('login', data);
  }

  @Post('signup')
  signup(@Body() data: any): Observable<any> {
    this.logger.log('Handling signup request with data:', data);
    return this.authProxy.send('signup', data);
  }

  @Get('getAll')
  getAllUser(): Observable<any> {
    this.logger.log('Handling getAllUser request');
    return this.authProxy.send('getAllUser', {});
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: { email: string }): Observable<any> {
    this.logger.log('Handling forgotPassword request with email:', body.email);
    return this.authProxy.send('forgotPassword', body.email);
  }

  @Post('reset-password')
  resetPassword(
    @Body() body: { resetToken: string; newPassword: string },
  ): Observable<any> {
    this.logger.log('Handling resetPassword request with data:', body);
    return this.authProxy.send('resetPassword', body);
  }

  @Post('suspend-user')
  suspendUser(@Body() body: { userId: string }): Observable<any> {
    this.logger.log('Handling suspendUser request with userId:', body.userId);
    return this.authProxy.send('suspendUser', body.userId);
  }

  @Post('reactivate-user')
  reactivateUser(@Body() body: { userId: string }): Observable<any> {
    this.logger.log(
      'Handling reactivateUser request with userId:',
      body.userId,
    );
    return this.authProxy.send('reactivateUser', body.userId);
  }
}
