import { Position, Sprite, type Entity, CreateEntityDto, RemoveEntityDto, PositionDto, ScoreDto, Score } from "@game/shared";
import { World } from "../../ecs/world";
import type { Component } from "@game/shared/dist/components/component";
import { bindKeyboard } from "../../util/keyboardbind";
import { networkClient } from "./networkClient";

export const EventHandle = {
    onConnected(world: World, dto: boolean) {
        bindKeyboard(world, networkClient.getClientId()!);
    },

    onRemoveEntity(world : World, dto: RemoveEntityDto) {
        dto.entities.forEach((e) => {
            world.addToRemove(e);
        })
    },

    onCreateEntity(world : World, dto : CreateEntityDto){
        console.log(dto);
        const result = new Map<Entity, Map<string, Component>>();

        for (const [className, entries] of Object.entries(dto.components)) {
            for (const [ key, comp ] of Object.entries(entries)) {
                let compMap = result.get(key);

                if (!compMap) {
                compMap = new Map<string, Component>();
                result.set(key, compMap);
                }

                compMap.set(className, comp);
            }
        }

        result.forEach((components, entity) => {
            world.addToAdd(entity, components);
        });
    },

    onPosition(world : World, dto: PositionDto) {
        Object.entries(dto.positions).forEach(([entity, position]) => {
            const posComp = world.get(entity, Position) as Position;

            if (posComp) {
                posComp.x = position.x;
                posComp.y = position.y;
            }
        });
    },

    onScore(world: World, dto : ScoreDto){
        Object.entries(dto.scores).forEach(([entity, score]) => {
            const scoreComp = world.get(entity, Score);
    
            if(scoreComp) scoreComp.value = score.value;
        });
    },
}