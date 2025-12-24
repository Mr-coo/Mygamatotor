import { Position } from "@game/shared";
import type { World } from "../world";

export function renderSystem(
  ctx: CanvasRenderingContext2D,
  world: World
) {

  ctx.clearRect(0, 0, 800, 600);
  
  for(const e of world.query(Position)) {
    const p = world.get(e, Position) as Position;
    ctx.fillRect(p.x, p.y, 20, 20);
  }
}
