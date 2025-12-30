import { EventSocket, RemoveEntityDto } from '@game/shared';
import { World } from '../world';

export function removeEntity(
  world: World,
  broadCastData: (event: EventSocket, data: any) => void,
) {
  if (world.toRemove.size == 0) return;

  world.toRemove.forEach((entity) => {
    world.entities.delete(entity);
    for (const map of world.components.values()) {
      map.delete(entity);
    }
  });

  const entities: string[] = Array.from(world.toRemove);

  broadCastData(EventSocket.REMOVE_ENTITY, new RemoveEntityDto(entities));

  world.toRemove.clear();
}
