import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from 'src/Rabbitmq/rabbitmq.config.';
import { PriceController } from './price.controller';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRICE_SERVICE',
        transport: Transport.RMQ,
        options: rabbitmqConfig.options,
      },
    ]),
  ],
  controllers: [PriceController],
  providers: [JwtService],
})
export class PriceModule {}
