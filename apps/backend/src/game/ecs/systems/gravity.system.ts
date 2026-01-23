import { Input, MovementConstraint, Velocity, Weight } from '@game/shared';
import { World } from '../world';

export function GravitySystem(world: World) {
  for (const e of world.query(Velocity)) {
    const velocity = world.get(e, Velocity) as Velocity;
    const weight = world.get(e, Weight) as Weight;

    velocity.dy += 0.1*weight.value;
  }
}
