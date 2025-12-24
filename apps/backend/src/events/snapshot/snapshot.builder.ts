// snapshot/snapshot.builder.ts
import { Position } from '@game/shared';
import { World } from '../ecs/world';

export function buildSnapshot(world: World) {
  return {
    entities: world.query(Position).map(e => {
      const p = world.get(e, Position) as Position;
      return { id: e, x: p.x, y: p.y };
    }),
  };
}
