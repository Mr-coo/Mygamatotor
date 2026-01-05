import { Injectable } from "@nestjs/common";
import { GameLoop } from "./games/game-loop.service";
import { EventSocket, GameName, Input, Player, Position, Score, Size, Sprite, Velocity } from "@game/shared";
import { FightOverFood } from "./games/fight-over-food.service";
import { Component } from "@game/shared/dist/components/component";
import { Server, Socket } from "socket.io";
import { PongPongPong } from "./games/pong-pong-pong.service";

@Injectable()
export class GameRoomManager {
  private rooms = new Map<string, GameLoop>();
  private clients = new Map<string, string>(); // client, roomId

  create(type : GameName, server: Server): GameLoop {
    const roomId = crypto.randomUUID();
    let loop : GameLoop;
    switch (type) {
      case GameName.FIGHT_OVER_FOOD: loop = new FightOverFood(server, roomId);break;
      // case GameName.FIGHT_OVER_FOOD:
      default: loop = new FightOverFood(server, roomId);break;
    }

    this.rooms.set(roomId, loop);
    return loop;
  }

  getByRoomId(roomId: string): GameLoop | undefined {
    return this.rooms.get(roomId);
  }

  getByClientId(clientId: string): GameLoop | undefined {
    const roomId =  this.clients.get(clientId);
    if(roomId) return this.getByRoomId(roomId);
  }

  remove(roomId: string) {
    const loop = this.rooms.get(roomId);
    this.rooms.delete(roomId);
  }

  removeClient(clientId: string){
    const roomId = this.clients.get(clientId);
    if(roomId == null) return;
      
    this.rooms.get(roomId)?.world.addToRemove(clientId);

    const clientList: string[] = [];
    this.clients.forEach((room, client) => {
      if(room == roomId) clientList.push(client);
    })
    clientList.forEach((c) => this.clients.delete(c));

    this.rooms.get(roomId)?.decPlayer();
  }

  addClient(client: Socket, type: GameName, server: Server){
    if(this.clients.get(client.id) != undefined) return;

    let gameLoop : GameLoop | null = null;
    let playerData : Map<string, Component>;

    if(type == GameName.FIGHT_OVER_FOOD){
      playerData = new Map<string, Component>([
          [Position.name, new Position(0, 0)],
          [Velocity.name, new Velocity()],
          [Input.name, new Input()],
          [Size.name, new Size(150, 150)],
          [Sprite.name, new Sprite('wendy', false)],
          [Player.name, new Player()],
          [Score.name, new Score()],
        ]);
    }
    else if(type == GameName.PONG_PONG_PONG){
      playerData = new Map<string, Component>([
        [Position.name, new Position(0, 0)],
        [Velocity.name, new Velocity()],
        [Input.name, new Input()],
        [Size.name, new Size(150, 150)],
        [Sprite.name, new Sprite('tang', false)],
        [Player.name, new Player()],
        [Score.name, new Score()],
      ]);
    }
    else return;

    this.rooms.forEach((loop, roomId) => {
      if(loop instanceof FightOverFood && type == GameName.FIGHT_OVER_FOOD && loop.isValidToJoin()){
        gameLoop = loop;
      }
      else if(loop instanceof PongPongPong && type == GameName.PONG_PONG_PONG && loop.isValidToJoin()){
        gameLoop = loop;
      }
    });

    if(gameLoop === null) gameLoop = this.create(type, server);

    client.join(gameLoop.roomId);
    this.clients.set(client.id, gameLoop.roomId);

    gameLoop.incPlayer();
    gameLoop.world.addToAdd(client.id,playerData);
    gameLoop.start();
  }
}
