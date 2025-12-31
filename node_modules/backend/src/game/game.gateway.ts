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
  CreateEntityDto,
  Entity,
  EventSocket,
  Input,
  Player,
  Position,
  Score,
  Size,
  Sprite,
  Velocity,
} from '@game/shared';
import { GameLoop } from './gameLoop.service';
import { Server } from 'socket.io';
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

    this.loop.start((event: EventSocket, data: any) => {
      this.server.emit(event.toString(), data);
    });

    const record: Record<string, Record<Entity, Component>> = {};

    this.loop.world.components.forEach((map, name) => {
      record[name] = {};
      map.forEach((comp, entity) => {
        record[name][entity] = comp;
      });
    });

    this.server
      .to(client.id)
      .emit(
        EventSocket.CONNECTED.toString(),
        new CreateEntityDto([...this.loop.world.entities], record),
      );

    this.loop.world.addToAdd(
      client.id,
      new Map<string, Component>([
        [Position.name, new Position(0, 0)],
        [Velocity.name, new Velocity()],
        [Input.name, new Input()],
        [Size.name, new Size(150, 150)],
        [Sprite.name, new Sprite('main.character', false)],
        [Player.name, new Player()],
        [Score.name, new Score()],
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
