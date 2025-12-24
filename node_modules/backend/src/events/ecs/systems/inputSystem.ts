import type { InputCommand } from "@game/shared/";
import { Input, Velocity } from "@game/shared/";
import { World } from "../world";

let seq = 0;

export function inputSystem(world: World) {
  for(const e of world.query(Input, Velocity)) {
    const input = world.get(e, Input) as Input;
    const velocity = world.get(e, Velocity) as Velocity;

    velocity.dx = input.left ? -100 : input.right ? 100 : 0;
    velocity.dy = input.up ? -100 : input.down ? 100 : 0;

    console.log(`Entity ${e} Input:`, {
      up: input.up,
      down: input.down,
      left: input.left,
      right: input.right,
      attackPressed: input.attackPressed,
      jumpPressed: input.jumpPressed
    });
  }
}
