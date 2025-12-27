import type { InputCommand } from "@game/shared/";
import { Input, Velocity } from "@game/shared/";
import { World } from "../world";

let seq = 0;

export function inputSystem(world: World) {
  // console.log(world.query(Input, Velocity))
  for(const e of world.query(Input, Velocity)) {
    const input = world.get(e, Input) as Input;
    const velocity = world.get(e, Velocity) as Velocity;

    const speed = 1;

    velocity.dx = (input.right ? speed : 0) - (input.left ? speed : 0);
    velocity.dy = (input.down ? speed : 0) - (input.up ? speed : 0);

    // console.log(`INPUT SYSTEM ${e}`, velocity.dy)
    // input.left = input.right = input.up = input.down = false;
  }
}
