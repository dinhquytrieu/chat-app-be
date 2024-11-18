import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addMessage', () => {
    it('should add a message to the messages array', () => {
      const message = { sender: 'John', message: 'Hello World' };
      service.addMessage(message);
      expect(service.getMessages()).toContain(message);
    });
  });

  describe('getMessages', () => {
    it('should return all stored messages', () => {
      const message1 = { sender: 'John', message: 'Hello World' };
      const message2 = { sender: 'Jane', message: 'Hi there!' };

      service.addMessage(message1);
      service.addMessage(message2);

      expect(service.getMessages()).toEqual([message1, message2]);
    });
  });
});
