import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from 'src/Rabbitmq/rabbitmq.config.';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: rabbitmqConfig.options,
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
