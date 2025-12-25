import type { InputCommand } from "@game/shared/";
import { Input, Velocity } from "@game/shared/";
import { World } from "../world";

let seq = 0;

export function inputSystem(world: World) {
  for(const e of world.query(Input, Velocity)) {
    const input = world.get(e, Input) as Input;
    const velocity = world.get(e, Velocity) as Velocity;

    velocity.dx = input.left ? -10 : input.right ? 10 : 0;
    velocity.dy = input.up ? -10 : input.down ? 10 : 0;
  }
}
