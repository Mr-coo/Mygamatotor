import { Injectable } from '@nestjs/common';
import { inputSystem } from '../ecs/systems/input.system';
import { movementSystem } from '../ecs/systems/movement.system';
import { World } from '../ecs/world';
import { spawnFoodSystem } from '../ecs/systems/spawnFood.system';
import { CreateEntityDto, Entity, EventSocket, Player } from '@game/shared';
import { collusionSystem } from '../ecs/systems/collusion.system';
import { addEntity } from '../ecs/systems/addEntity.system';
import { removeEntity } from '../ecs/systems/removeEntity.System';
import { sendPosition } from '../ecs/systems/sendPosition.system';
import { sendScore } from '../ecs/systems/sendScore.system';
import { GameLoop } from './game-loop.service';

export class FightOverFood extends GameLoop {
  world = new World();

  override isValidToJoin() {
      return this.playerCount < 2 && !this.isStart;
  }

  override start(){
    console.log(this.playerCount);
    if(!this.isValidToJoin()){
      this.isStart = true;

      this.broadCast(EventSocket.CONNECTED, true);

      this.run();
    }
  }

  override run() {
    setInterval(() => {
      this.onTick();
    }, 1000 / this.TICK_RATE);
  }

  override onTick() {
    inputSystem(this.world);
    movementSystem(this.world, this.DT);
    spawnFoodSystem(this.world);
    collusionSystem(this.world);

    addEntity(this.world, this.broadCast);
    removeEntity(this.world, this.broadCast);
    sendPosition(this.world, this.broadCast);
    sendScore(this.world, this.broadCast);
  }
}
