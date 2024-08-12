import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryController } from './category.controller';
import { rabbitmqConfig } from 'src/Rabbitmq/rabbitmq.config.';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.RMQ,
        options: rabbitmqConfig.options,
      },
    ]),
  ],
  providers: [JwtService],
  controllers: [CategoryController],
})
export class CategoryModule {}
