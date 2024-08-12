import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { rabbitmqConfig } from 'src/Rabbitmq/rabbitmq.config.';
import { ProductController } from './product.controller';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: rabbitmqConfig.options,
      },
    ]),
  ],
  providers: [JwtService],
  controllers: [ProductController],
})
export class ProductModule {}
