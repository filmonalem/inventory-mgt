import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from 'src/Rabbitmq/rabbitmq.config.';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SALES_SERVICE',
        transport: Transport.RMQ,
        options: rabbitmqConfig.options,
      },
    ]),
  ],
  controllers: [SalesController],
  providers: [JwtService],
})
export class SalesModule {}
