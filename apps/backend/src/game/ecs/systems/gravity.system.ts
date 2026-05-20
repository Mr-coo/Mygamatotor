import { Velocity, Weight } from '@game/shared';
import { World } from '../world';

const GRAVITY = 6;

export function GravitySystem(world: World, deltaTime: number) {
  for (const e of world.query(Velocity, Weight)) {
    const velocity = world.get(e, Velocity) as Velocity;
    const weight = world.get(e, Weight) as Weight;

    velocity.dy += GRAVITY * weight.value * deltaTime;
  }
}
