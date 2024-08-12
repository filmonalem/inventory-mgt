import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@WebSocketGateway({ namespace: '/stock' })
export class StockGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}

  @SubscribeMessage('createPayment')
  async handleCreatePayment(@MessageBody() createPaymentDto) {
    const newPayment = await this.paymentClient
      .send({ cmd: 'create_payment' }, createPaymentDto)
      .toPromise();
    this.server.emit('paymentCreated', newPayment);
    return newPayment;
  }

  // Add other message handlers if necessary
}
