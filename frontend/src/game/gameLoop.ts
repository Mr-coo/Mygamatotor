import type { World } from "../ecs/entities/world";
import { movementSystem } from "../ecs/systems/movementSystem";
import { renderSystem } from "../ecs/systems/renderSystem";

export function startGameLoop(
  world: World,
  ctx: CanvasRenderingContext2D
) {
  let last = performance.now();

  function loop(now: number) {
    const dt = (now - last) / 1000;
    last = now;

    movementSystem(world, dt);
    renderSystem(ctx, world);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
