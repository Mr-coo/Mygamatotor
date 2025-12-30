import { EventSocket, RemoveEntityDto } from '@game/shared';
import { World } from '../world';

export function removeEntity(
  world: World
) {
  world.toRemove.forEach((entity) => {
    world.entities.delete(entity);
    for (const map of world.components.values()) {
      map.delete(entity);
    }
  });

  world.toRemove.clear();
}
