import { EventSocket } from "@game/shared";
import { World } from "../ecs/world";
import { Server } from "socket.io";

export abstract class GameLoop {
  readonly TICK_RATE = 60;
  readonly DT = 1 / this.TICK_RATE;

  world = new World();

  readonly server: Server;
  readonly roomId: string;
  protected playerCount = 0;
  protected isStart = false;

  constructor(server : Server, roomId : string){
    this.server = server;
    this.roomId = roomId;
  }

  abstract start();
  abstract run();
  abstract onTick();
  abstract isValidToJoin();

  broadCast = async (event : EventSocket, data : any) => {
    this.server.to(this.roomId).emit(event.toString(), data);
  }

  incPlayer(){
    this.playerCount++;
  }

  decPlayer(){
    this.playerCount--;
  }
}