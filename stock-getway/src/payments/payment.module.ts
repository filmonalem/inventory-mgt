import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from 'src/Rabbitmq/rabbitmq.config.';
import { PaymentController } from './payment.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: rabbitmqConfig.options,
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [JwtService],
})
export class PaymentModule {}
