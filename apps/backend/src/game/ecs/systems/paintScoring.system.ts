import { Paintable, Painter, Player, Score } from '@game/shared';
import { World } from '../world';

export function paintScoringSystem(world: World) {
  const counts = new Map<string, number>();

  for (const t of world.query(Paintable)) {
    const p = world.get(t, Paintable)!;
    if (!p.color) continue;
    counts.set(p.color, (counts.get(p.color) ?? 0) + 1);
  }

  for (const e of world.query(Painter, Score, Player)) {
    const painter = world.get(e, Painter)!;
    const score = world.get(e, Score)!;
    score.value = counts.get(painter.color) ?? 0;
  }
}
