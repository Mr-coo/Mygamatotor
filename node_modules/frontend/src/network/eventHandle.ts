import { Position, Sprite, type Entity, CreateEntityDto, RemoveEntityDto, PositionDto, ScoreDto, Score } from "@game/shared";
import type { World } from "../ecs/world";
import type { Component } from "@game/shared/dist/components/component";

export function onConnected(world : World, dto: CreateEntityDto) {

    world.components = new Map<string, Map<Entity, Component>>(
        Object.entries(dto.components).map(([name, obj]) => [
            name,
            new Map(Object.entries(obj as Record<Entity, Component>) as [Entity, Component][])
        ])
    );
    world.entities = new Set(dto.entities);
}

export function onRemoveEntity(world : World, dto: RemoveEntityDto) {
    dto.entities.forEach((e) => {
        world.addToRemove(e);
    })
}

export function onCreateEntity(world : World, dto : CreateEntityDto){
    const result = new Map<Entity, Map<string, Component>>();

    for (const [className, { key, comp }] of Object.entries(dto.components)) {
        let compMap = result.get(key);

        if (!compMap) {
            compMap = new Map<string, Component>();
            result.set(key, compMap);
        }

        compMap.set(className, comp);
    }
    
    result.forEach((value, key) => {
        world.addToAdd(key, value);
    })
}

export function onPosition(world : World, dto: PositionDto) {
    Object.entries(dto.positions).forEach(([entity, position]) => {
        const posComp = world.get(entity, Position) as Position;

        if (posComp) {
            posComp.x = position.x;
            posComp.y = position.y;
        }
    });
}

export function onScore(world: World, dto : ScoreDto){
    Object.entries(dto.scores).forEach(([entity, score]) => {
        const scoreComp = world.get(entity, Score);
   
        if(scoreComp) scoreComp.value = score.value;
    });
}