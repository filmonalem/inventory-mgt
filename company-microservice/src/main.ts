import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from './Rabbitmq/rabbitmq.config.';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: rabbitmqConfig.options,
    },
  );
  await app.listen();
  Logger.log('🚀 Auth microservice is listening');
}
bootstrap();
