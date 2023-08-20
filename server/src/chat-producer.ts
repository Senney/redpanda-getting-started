import { ChatMessage } from './chat';
import { Producer } from './producer';

const chatProducer = new Producer<ChatMessage>('chat-room');

export { chatProducer };
