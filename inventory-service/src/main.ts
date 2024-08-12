import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from './Rabbitmq/rabbitmq.config.';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: rabbitmqConfig.options,
    },
  );
  await app.listen();
  Logger.log('Microservice is listening');
}
bootstrap();
