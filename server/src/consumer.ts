import { Consumer as KafkaConsumer, KafkaMessage } from 'kafkajs';
import { randomUUID } from 'crypto';

import { redpanda } from './panda';

abstract class Consumer<T> {
  private _consumer: KafkaConsumer;

  constructor(private topicName: string) {
    this._consumer = redpanda.consumer({
      groupId: randomUUID(),
    });
  }

  public async start(): Promise<void> {
    await this._consumer.connect();

    try {
      await this._consumer.subscribe({ topic: this.topicName });
      await this._consumer.run({
        eachMessage: async ({ message }) => {
          if (!message.value) {
            console.error('Received empty message. Ignoring.');

            return;
          }

          const messageString = message.value.toString('utf-8');
          const messageObject = JSON.parse(messageString) as T;

          await this.onMessage(messageObject, message);
        },
      });

      this._consumer.seek({
        topic: this.topicName,
        offset: '0',
        partition: 0,
      });
    } catch (error) {
      console.error('Error:', error);

      await this._consumer.stop();
    }
  }

  protected abstract onMessage(message: T, raw: KafkaMessage): Promise<void>;
}

export { Consumer };
