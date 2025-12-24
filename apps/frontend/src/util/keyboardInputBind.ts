import { Input, type Entity } from "@game/shared";
import type { World } from "../ecs/world";

export function bindKeyboard(world: World, player: Entity) {
  window.addEventListener('keydown', e => {
    const input = world.get(player, Input) as Input;
    if (!input) return;

    if (e.key === 'w') input.up = true;
    if (e.key === 's') input.down = true;
    if (e.key === 'a') input.left = true;
    if (e.key === 'd') input.right = true;
  });

  window.addEventListener('keyup', e => {
    const input = world.get(player, Input) as Input;
    if (!input) return;

    if (e.key === 'w') input.up = false;
    if (e.key === 's') input.down = false;
    if (e.key === 'a') input.left = false;
    if (e.key === 'd') input.right = false;
  });
}
