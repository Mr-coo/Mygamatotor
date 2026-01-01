import { EventSocket, Player, RemoveEntityDto } from '@game/shared';
import { World } from '../world';
import { useGameStore } from '../../store/game.store';

export function removeEntity(
  world: World
) {
  world.toRemove.forEach((entity) => {
    if(world.get(entity, Player) != undefined)
      useGameStore.getState().removeScores(entity);
    world.entities.delete(entity);
    for (const map of world.components.values()) {
      map.delete(entity);
    }
  });

  world.toRemove.clear();
}
