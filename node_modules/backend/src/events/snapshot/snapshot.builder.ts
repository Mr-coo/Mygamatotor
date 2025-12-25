// snapshot/snapshot.builder.ts
import { Position, Snapshot } from '@game/shared';
import { World } from '../ecs/world';

export function buildSnapshot(world: World) : Snapshot {
  return new Snapshot(world.components, world.entities);
}
