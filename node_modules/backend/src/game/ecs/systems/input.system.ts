import { Input, Jump, MovementConstraint, OnGround, Velocity } from '@game/shared';
import { World } from '../world';

export function inputSystem(world: World) {
  for (const e of world.query(Input, Velocity, MovementConstraint, Jump, OnGround)) {
    const input = world.get(e, Input) as Input;
    const velocity = world.get(e, Velocity) as Velocity;
    const movementConstraint = world.get(e, MovementConstraint) as MovementConstraint;
    const jump = world.get(e, Jump) as Jump;
    const onGround = world.get(e, OnGround) as OnGround;

    const speed = 1;

    if(movementConstraint.allowX) velocity.dx = (input.right ? speed : 0) - (input.left ? speed : 0);
    if(movementConstraint.allowY) velocity.dy = (input.down ? speed : 0) - (input.up ? speed : 0);

    if(jump.canJump && input.up && onGround.value){
      velocity.dy = -2.3;
      onGround.value = false;
    }
  }
}
