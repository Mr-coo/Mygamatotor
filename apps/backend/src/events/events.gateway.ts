import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { EventSocket, Input, Position, PositionSnapshot, Velocity , Size, Sprite } from '@game/shared';
import { Server } from 'http';
import { GameLoop } from './game.loop';
import { buildConnectedDto, buildPositionSnapshot } from './dto/dto.builder';
import { onConnected, onDisconnected } from './event.handle';

@WebSocketGateway({
  namespace: 'events',
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect{
  @WebSocketServer()
  server: Server;

  constructor(private loop : GameLoop) {}

  afterInit() {
    console.log('WebSocket Initialized');
  }

  handleConnection(client: Socket) {
    onConnected(this.loop, client, this.broadcastData.bind(this))
  }

  handleDisconnect(client: Socket) {
    onDisconnected(this.loop, client, this.broadcastData.bind(this))
  }

  @SubscribeMessage(EventSocket.Input.toString())
  handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const input = this.loop.world.get(client.data.entity, Input);

    if (!input) return;
      
    input.up = data.up;
    input.down = data.down;
    input.left = data.left;
    input.right = data.right;
    input.attackPressed = data.attackPressed;
    input.jumpPressed = data.jumpPressed;
  }

  broadcastData(event: EventSocket, data : any) {
    this.server.emit(event.toString(), data);
  }
}
