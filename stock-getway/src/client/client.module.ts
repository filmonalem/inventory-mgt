import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
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
  providers: [JwtService],
  controllers: [ClientController],
})
export class ClientModule {}
