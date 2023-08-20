import { Producer as KafkaProducer } from 'kafkajs';

import { redpanda } from './panda';

class Producer<T> {
  private _initialized: boolean = false;
  private _producer: KafkaProducer | undefined;

  constructor(private topicName: string) {}

  public async send(message: T): Promise<void> {
    if (!this._initialized) {
      await this.initialize();
    }

    try {
      await this.producer.send({
        topic: this.topicName,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (err) {
      console.error('Error:', err);
    }
  }

  private get producer(): KafkaProducer {
    if (!this._producer) {
      throw new Error('Cannot access producer before it is initialized.');
    }

    return this._producer;
  }

  private async initialize(): Promise<void> {
    this._producer = redpanda.producer();

    await this._producer.connect();

    this._initialized = true;
  }

  public async stop(): Promise<void> {
    if (!this._producer || !this._initialized) {
      return;
    }

    await this._producer.disconnect();

    this._initialized = false;
    this._producer = undefined;
  }
}

export { Producer };
