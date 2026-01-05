import { Input, MovementConstraint, Velocity } from '@game/shared';
import { World } from '../world';

export function inputSystem(world: World) {
  for (const e of world.query(Input, Velocity, MovementConstraint)) {
    const input = world.get(e, Input) as Input;
    const velocity = world.get(e, Velocity) as Velocity;
    const movementConstraint = world.get(e, MovementConstraint) as MovementConstraint;

    const speed = 1;

    if(movementConstraint.allowX) velocity.dx = (input.right ? speed : 0) - (input.left ? speed : 0);
    if(movementConstraint.allowY) velocity.dy = (input.down ? speed : 0) - (input.up ? speed : 0);
  }
}
