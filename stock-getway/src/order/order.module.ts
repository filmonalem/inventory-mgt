import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { rabbitmqConfig } from 'src/Rabbitmq/rabbitmq.config.';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.RMQ,
        options: rabbitmqConfig.options,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [JwtService],
})
export class OrderModule {}
