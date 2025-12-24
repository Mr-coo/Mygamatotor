// game.loop.ts
import { Injectable } from '@nestjs/common';
import { inputSystem } from './ecs/systems/inputSystem';
import { movementSystem } from './ecs/systems/movementSystem';
import { World } from './ecs/world';

@Injectable()
export class GameLoop {
  isStart = false;
  readonly TICK_RATE = 20;
  readonly DT = 1 / this.TICK_RATE;

  world = new World();

  start(onTick: () => void) {
    setInterval(() => {
      inputSystem(this.world);
      movementSystem(this.world, this.DT);

      onTick();
    }, 1000 / this.TICK_RATE);
  }
}
