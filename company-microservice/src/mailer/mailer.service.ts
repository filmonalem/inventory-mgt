import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    const email = this.configService.get<string>('EMAIL_USER');
    const password = this.configService.get<string>('EMAIL_PASS');

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: email,
        pass: password,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
