import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from 'src/Rabbitmq/rabbitmq.config.';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMPANY_SERVICE',
        transport: Transport.RMQ,
        options: rabbitmqConfig.options,
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [JwtService],
})
export class TransactionModule {}
