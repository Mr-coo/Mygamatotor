import { addEntity } from "../ecs/systems/addEntity.system";
import { inputSystem } from "../ecs/systems/input.system";
import { removeEntity } from "../ecs/systems/removeEntity.system";
import { renderSystem } from "../ecs/systems/render.system";
import type { World } from "../ecs/world";
import type { networkClient } from "../network/networkClient";

export function startGameLoop(
  world: World,
  ctx: CanvasRenderingContext2D,
) {
  let last = performance.now();

  function loop(now: number) {
    const dt = (now - last) / 1000;
    last = now;

    inputSystem(world, dt);
    renderSystem(ctx, world, dt);

    addEntity(world);
    removeEntity(world);
    
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}