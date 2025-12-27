// snapshot/snapshot.builder.ts
import { ConnectedDto, Entity, Position, PositionSnapshot, SingleEntityDto } from '@game/shared';
import { World } from '../ecs/world';
import { Component } from '@game/shared/dist/components/component';

export function buildPositionSnapshot(world: World) : PositionSnapshot {
  const entities = world.query(Position);
  const positionsList: Record<string, Position> = {};
  
  entities.map((entity) => {
    const position = world.get(entity, Position) as Position;
    positionsList[entity] = position;
  });

  return new PositionSnapshot(positionsList);
}

export function buildConnectedDto(world: World, entity: string) : ConnectedDto {
  const entities = [...world.entities];
  const components = Object.fromEntries(
    [...world.components.entries()].map(([name, map]) => [
      name,
      Object.fromEntries(map)
    ])
  );

  return new ConnectedDto(entities, components);
}

export function buildSingleEntityDto(entity: string, componentsList : Map<string, Component>) : SingleEntityDto {
  const entities = entity;
  const components : Record<string, Component> = {};

  componentsList.forEach((val, key) => {
    console.log(val, key);
    components[key] = val;
  })

  return new SingleEntityDto(entities, components);
}