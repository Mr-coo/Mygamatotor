import { Paintable, Painter, Position, Size } from '@game/shared';
import { World } from '../world';

export function paintTrailSystem(world: World) {
  const tiles = world.query(Paintable, Position, Size);

  for (const e of world.query(Painter, Position, Size)) {
    const painter = world.get(e, Painter)!;
    const pos = world.get(e, Position)!;
    const size = world.get(e, Size)!;

    const left = pos.x - painter.radius;
    const right = pos.x + size.width + painter.radius;
    const top = pos.y - painter.radius;
    const bottom = pos.y + size.height + painter.radius;

    for (const t of tiles) {
      const tPos = world.get(t, Position)!;
      const tSize = world.get(t, Size)!;

      if (
        right <= tPos.x ||
        left >= tPos.x + tSize.width ||
        bottom <= tPos.y ||
        top >= tPos.y + tSize.height
      ) {
        continue;
      }

      const paintable = world.get(t, Paintable)!;
      if (paintable.color !== painter.color) {
        paintable.color = painter.color;
        paintable.dirty = true;
      }
    }
  }
}
