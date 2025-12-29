import { Injectable } from '@nestjs/common';
import { inputSystem } from './ecs/systems/input.system';
import { movementSystem } from './ecs/systems/movement.system';
import { World } from './ecs/world';
import { spawnFoodSystem } from './ecs/systems/spawnFood.system';
import { EventSocket } from '@game/shared';
import { collusionSystem } from './ecs/systems/collusion.system';
import { addEntity } from './ecs/systems/addEntity.system';
import { removeEntity } from './ecs/systems/removeEntity.System';

@Injectable()
export class GameLoop {
  isStart = false;
  readonly TICK_RATE = 30;
  readonly DT = 1 / this.TICK_RATE;

  world = new World();

  start(
    onTick: () => void,
    broadCastData: (event: EventSocket, data: any) => void,
  ) {
    setInterval(() => {
      inputSystem(this.world);
      movementSystem(this.world, this.DT);
      spawnFoodSystem(this.world);
      collusionSystem(this.world);

      addEntity(this.world, broadCastData);
      removeEntity(this.world, broadCastData);

      onTick();
    }, 1000 / this.TICK_RATE);
  }
}
