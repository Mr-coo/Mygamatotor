import { addEntity } from "../ecs/systems/addEntity.system";
import { inputSystem } from "../ecs/systems/input.system";
import { removeEntity } from "../ecs/systems/removeEntity.system";
import { renderSystem } from "../ecs/systems/render.system";
import { syncToUI } from "../ecs/systems/syncToUI.system";
import type { World } from "../ecs/world";

export function startGameLoop(
  world: World,
  ctx: CanvasRenderingContext2D,
) {
  let last = performance.now();

  function loop(now: number) {
    const dt = (now - last) / 1000;
    last = now;

    renderSystem(ctx, world, dt);

    addEntity(world);
    removeEntity(world);
    syncToUI(world);
    
    requestAnimationFrame(loop);
  }

  setInterval(()=>{
    inputSystem(world, 100);
  }, 50);

  requestAnimationFrame(loop);
}