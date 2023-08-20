import * as readline from 'node:readline';
import { ChatConsumer } from './chat-consumer';
import { chatProducer } from './chat-producer';
import { randomUUID } from 'node:crypto';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  const consumer = new ChatConsumer();

  rl.question('Enter user name: \n', async (username) => {
    await consumer.start();

    rl.on('line', async (input) => {
      readline.moveCursor(process.stdout, 0, -1);

      await chatProducer.send({
        id: randomUUID(),
        user: username,
        message: input,
      });
    });
  });
};

main().catch(console.error);
