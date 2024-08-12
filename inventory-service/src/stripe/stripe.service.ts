import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private minimumAmounts: Record<string, number>;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2024-06-20',
      },
    );

    this.minimumAmounts = {
      USD: 50,
      EUR: 50,
      GBP: 30,
      ETB: 200,
    };
  }

  async createPaymentIntent(amount: number, currency: string) {
    try {
      const minimumAmount = this.minimumAmounts[currency.toUpperCase()];
      if (!minimumAmount) {
        throw new BadRequestException(`Unsupported currency: ${currency}`);
      }

      if (amount < minimumAmount) {
        throw new BadRequestException(
          `The amount must be at least ${minimumAmount} ${currency.toUpperCase()} cents.`,
        );
      }

      return await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
    } catch (error) {
      console.error(`Stripe Error: ${error.message}`);

      if (error.code === 'amount_too_small') {
        throw new BadRequestException(
          'The amount is below the minimum allowed for this currency.',
        );
      }

      throw new Error(`Stripe Error: ${error.message}`);
    }
  }
}
