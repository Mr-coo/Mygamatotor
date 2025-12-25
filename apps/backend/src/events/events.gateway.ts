import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { EventSocket, Input, Position, Snapshot, Velocity } from '@game/shared';
import { Server } from 'http';
import { GameLoop } from './game.loop';
import { buildSnapshot } from './snapshot/snapshot.builder';

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
    console.log(`Client connected: ${client.id}`);

    if(this.loop.isStart === false) {
      this.loop.start(() => {
        const snapshot = buildSnapshot(this.loop.world);
        this.broadcastSnapshot(snapshot);
      });
    }

    const entity = this.loop.world.createEntity(client.id);
    this.loop.world.addComponent(entity, Position, { x: 0, y: 0 });
    this.loop.world.addComponent(entity, Velocity, { dx: 0, dy: 0 });
    this.loop.world.addComponent(entity, Input, { up: false, down: false, left: false, right: false } );

    client.data.entity = entity;
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.loop.world.removeEntity(client.data.entity);
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

  broadcastSnapshot(snapshot: Snapshot) {
    this.server.emit(EventSocket.Snapshot.toString(), snapshot);
  }
}
