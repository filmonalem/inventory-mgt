import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CompanyController } from './company.controller';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
// import { AuthController } from './auth.controller';
// import { rabbitmqConfig } from 'src/Rabbitmq/rabbitmq.config.';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMPANY_SERVICE',
        transport: Transport.RMQ,
        // options: rabbitmqConfig.options,
        options: {
          urls: [`amqp://localhost:5672`],
        },
      },
    ]),
  ],
  controllers: [
    CompanyController,
    UserController,
    //  AuthController
  ],
  providers: [JwtService],
})
export class CompanyModule {}
