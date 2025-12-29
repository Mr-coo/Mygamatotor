import { Input, Velocity } from '@game/shared';
import { World } from '../world';

export function inputSystem(world: World) {
  for (const e of world.query(Input, Velocity)) {
    const input = world.get(e, Input) as Input;
    const velocity = world.get(e, Velocity) as Velocity;

    const speed = 100;

    velocity.dx = (input.right ? speed : 0) - (input.left ? speed : 0);
    velocity.dy = (input.down ? speed : 0) - (input.up ? speed : 0);
  }
}
