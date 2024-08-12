export const rabbitmqConfig = {
  transport: 'RMQ',
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'stock_queue',
    queueOptions: {
      durable: false,
    },
  },
};
