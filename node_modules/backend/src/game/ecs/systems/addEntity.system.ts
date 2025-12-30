import { CreateEntityDto, Entity, EventSocket } from '@game/shared';
import { World } from '../world';
import { Component } from '@game/shared/dist/components/component';

export function addEntity(
  world: World,
  broadCastData: (event: EventSocket, data: any) => void,
) {
  if (world.toAdd.size == 0) return;

  const dto: Record<string, Record<Entity, Component>> = {};
  world.toAdd.forEach((value, key) => {
    world.entities.add(key);
    value.forEach((comp, name) => {
      world.addComponent(key, name, comp);
      dto[name] = { key, comp };
    });
  });

  broadCastData(
    EventSocket.CREATE_ENTITY,
    new CreateEntityDto([...world.toAdd.keys()], dto),
  );

  world.toAdd.clear();
}
