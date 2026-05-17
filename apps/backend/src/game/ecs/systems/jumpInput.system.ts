import { Input, Jump, OnGround, Velocity } from '@game/shared';
import { World } from '../world';

export function jumpInputSystem(world: World) {
  for (const e of world.query(Input, Velocity, Jump, OnGround)) {
    const input = world.get(e, Input) as Input;
    const velocity = world.get(e, Velocity) as Velocity;
    const jump = world.get(e, Jump) as Jump;
    const onGround = world.get(e, OnGround) as OnGround;

    if (jump.canJump && input.up && onGround.value) {
      velocity.dy = -2.3;
      onGround.value = false;
    }
  }
}
