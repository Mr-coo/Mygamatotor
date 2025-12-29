import { Food, Player, Position, Size } from '@game/shared';
import { World } from '../world';

export function collusionSystem(world: World) {
  for (const e of world.query(Player)) {
    const p1 = world.get(e, Position) as Position;
    const s1 = world.get(e, Size) as Size;

    for (const f of world.query(Food)) {
      const p2 = world.get(f, Position) as Position;
      const s2 = world.get(f, Size) as Size;

      const isIntersect =
        p1.x < p2.x + s2.width &&
        p1.x + s1.width > p2.x &&
        p1.y < p2.y + s2.height &&
        p1.y + s1.height > p2.y;

      if (isIntersect) {
        world.addToRemove(f);
      }
    }
  }
}
