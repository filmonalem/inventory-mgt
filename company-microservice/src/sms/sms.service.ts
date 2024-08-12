import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';
@Injectable()
export class SmsService {
  private client: Twilio.Twilio;
  constructor(private configService: ConfigService) {
    this.client = Twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }
  async sendSms(to: string, body: string) {
    await this.client.messages.create({
      body,
      from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
      to,
    });
  }
}
