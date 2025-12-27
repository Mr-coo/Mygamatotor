import { inputSystem } from "../ecs/systems/inputSystem";
import { movementSystem } from "../ecs/systems/movementSystem";
import { renderSystem } from "../ecs/systems/renderSystem";
import type { World } from "../ecs/world";
import type { NetworkClient } from "../network/client";

export function startGameLoop(
  world: World,
  ctx: CanvasRenderingContext2D,
  networkClient: NetworkClient
) {
  let last = performance.now();

  function loop(now: number) {
    const dt = (now - last) / 1000;
    last = now;

    inputSystem(world, networkClient, dt);
    movementSystem(world, dt);
    renderSystem(ctx, world);
    
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
