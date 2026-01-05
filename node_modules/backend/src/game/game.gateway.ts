import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  EventSocket,
  GameName,
  Input,
} from '@game/shared';
import { Server, Socket } from 'socket.io';
import { GameRoomManager } from './game-room-manager';

@WebSocketGateway({
  namespace: 'game',
  cors: {
    origin: '*',
  },
})
export class GameGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly rooms: GameRoomManager) {}

  afterInit() {
    console.log('websockets Initialize');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.rooms.removeClient(client.id);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage(EventSocket.INPUT.toString())
  handleInput(client: Socket, data: Input) {
    const input = this.rooms.getByClientId(client.id)?.world.get(client.id, Input);
    if (!input) return;

    Object.assign(input, data);
  }

  @SubscribeMessage(EventSocket.JOIN.toString())
  handleJoin(client: Socket, data: GameName) {
    this.rooms.addClient(client, data, this.server);
  }
}
