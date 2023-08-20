import { Kafka } from 'kafkajs';

const redpanda = new Kafka({
  brokers: ['localhost:19092', 'localhost:39092', 'localhost:29092'],
});

export { redpanda };
