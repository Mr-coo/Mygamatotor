// game.loop.ts
import { Injectable } from '@nestjs/common';
import { inputSystem } from './ecs/systems/inputSystem';
import { movementSystem } from './ecs/systems/movementSystem';
import { World } from './ecs/world';
import { spawnFoodSystem } from './ecs/systems/spawnFoodSystem';
import { EventSocket } from '@game/shared';

@Injectable()
export class GameLoop {
  isStart = false;
  readonly TICK_RATE = 30;
  readonly DT = 1 / this.TICK_RATE;

  world = new World();

  start(onTick: () => void, broadCastData : (event : EventSocket, data : any) => void) {
    setInterval(() => {
      inputSystem(this.world);
      movementSystem(this.world, this.DT);
      spawnFoodSystem(this.world, broadCastData);

      onTick();
    }, 1000 / this.TICK_RATE);
  }
}
