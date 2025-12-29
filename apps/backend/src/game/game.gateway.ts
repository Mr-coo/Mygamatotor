import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {
  EventSocket,
  Input,
  Player,
  Position,
  Size,
  Sprite,
  Velocity,
} from '@game/shared';
import { GameLoop } from './gameLoop.service';
import { Server } from 'http';
import { Component } from '@game/shared/dist/components/component';

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

  constructor(private readonly loop: GameLoop) {}

  afterInit() {
    console.log('websockets Initialize');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.loop.world.addToRemove(client.id);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    this.loop.start((event: EventSocket, data: any) =>
      this.server.emit(event.toString(), data),
    );

    this.loop.world.addToAdd(
      client.id,
      new Map<string, Component>([
        [Position.constructor.name, new Position(0, 0)],
        [Velocity.constructor.name, new Velocity()],
        [Input.constructor.name, new Input()],
        [Size.constructor.name, new Size(100, 100)],
        [Sprite.constructor.name, new Sprite('main.character', false)],
        [Player.constructor.name, new Player()],
      ]),
    );
  }

  @SubscribeMessage(EventSocket.INPUT.toString())
  handleMessage(client: Socket, data: Input) {
    const input = this.loop.world.get(client.id, Input);

    if (!input) return;

    Object.assign(input, data);
  }
}
