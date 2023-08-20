import { ChatMessage } from './chat';
import { Consumer } from './consumer';

class ChatConsumer extends Consumer<ChatMessage> {
  constructor() {
    super('chat-room');
  }

  async onMessage(message: ChatMessage): Promise<void> {
    console.log(`${message.user}: ${message.message}`);
  }
}

export { ChatConsumer };
