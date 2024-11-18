import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { Server } from 'socket.io';

describe('ChatGateway', () => {
  let gateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleConnection', () => {
    it('should log when a client connects', () => {
      const mockClient = { id: 'test-id' } as any; // Mock Socket object
      const consoleSpy = jest.spyOn(console, 'log');

      gateway.handleConnection(mockClient);

      expect(consoleSpy).toHaveBeenCalledWith('Client connected: test-id');
    });
  });

  describe('handleDisconnect', () => {
    it('should log when a client disconnects', () => {
      const mockClient = { id: 'test-id' } as any; // Mock Socket object
      const consoleSpy = jest.spyOn(console, 'log');

      gateway.handleDisconnect(mockClient);

      expect(consoleSpy).toHaveBeenCalledWith('Client disconnected: test-id');
    });
  });

  describe('handleMessage', () => {
    it('should emit the received message to all clients', () => {
      const mockServer = {
        emit: jest.fn(),
      } as unknown as Server;

      gateway.server = mockServer;

      const mockClient = {} as any;
      const messagePayload = { sender: 'John', message: 'Hello World' };

      gateway.handleMessage(mockClient, messagePayload);

      expect(mockServer.emit).toHaveBeenCalledWith('message', messagePayload);
    });
  });
});
