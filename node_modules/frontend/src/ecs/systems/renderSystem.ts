import type { Position, World } from "@game/shared";

export function renderSystem(
  ctx: CanvasRenderingContext2D,
  world: World
) {
  const pos = world.getComponent<Position>('position');

  ctx.clearRect(0, 0, 800, 600);

  for (const [, p] of pos) {
    ctx.fillRect(p.x, p.y, 20, 20);
  }
}
