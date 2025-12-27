import { Position, PositionSnapshot, Sprite, type ConnectedDto, type Entity } from "@game/shared";
import type { World } from "../ecs/world";
import { bindKeyboard } from "../util/keyboardInputBind";
import type { Component } from "@game/shared/dist/components/component";

export function onConnected(world : World, connectedDto: ConnectedDto, clientId: string) {
    console.log(`Client connected: ${clientId}`);

    world.components = new Map<string, Map<Entity, Component>>(
        Object.entries(connectedDto.components).map(([name, obj]) => [
            name,
            new Map(Object.entries(obj as Record<Entity, Component>) as [Entity, Component][])
        ])
    );
    world.entities = new Set(connectedDto.entities);

    bindKeyboard(world, clientId);
}

export function onDisconnected(world : World, entity: string) {
    console.log(`Client disconnected: ${entity}`);
    world.removeEntity(entity);
}

export function onPositionSnapshot(world : World, snapshot: PositionSnapshot) {
    if(snapshot.positions === undefined) {
        console.warn("Received invalid snapshot data");
        return;
    }

    for(const [entity, position] of Object.entries(snapshot.positions)) {
        const spriteComp = world.get(entity, Sprite) as Sprite;
        const posComp = world.get(entity, Position) as Position;
        
        if(spriteComp){
            spriteComp.flipX = posComp.x > position.x;
        }

        if (posComp) {
            posComp.x = position.x;
            posComp.y = position.y;
        }

    }
}