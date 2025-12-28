import { EventSocket, Food, Input, Player, Position, PositionSnapshot, Size, SpeedPotion, Sprite, Velocity, WORLD_HEIGHT, WORLD_WIDTH, type ConnectedDto, type Entity } from "@game/shared";
import type { World } from "./ecs/world";
import { buildConnectedDto, buildPositionSnapshot, buildSingleEntityDto } from "./dto/dto.builder";
import { Socket } from "socket.io";
import { GameLoop } from "./game.loop";
import { Component } from "@game/shared/dist/components/component";

export function onConnected(loop : GameLoop, client : Socket, broadCastData : (event: EventSocket, data : any) => void) {
    console.log(`Client connected: ${client.id}`);

    if(loop.isStart === false) {
      loop.start(() => {
        const snapshot = buildPositionSnapshot(loop.world);
        broadCastData(EventSocket.PositionSnapshot, snapshot);
      }, broadCastData);
    }

    const entity = loop.world.createEntity(client.id);
    loop.world.addComponent(entity, Position, { x: 0, y: 0 });
    loop.world.addComponent(entity, Velocity, { dx: 0, dy: 0 });
    loop.world.addComponent(entity, Input, { up: false, down: false, left: false, right: false } );
    loop.world.addComponent(entity, Size, { width: 100, height: 100 });
    loop.world.addComponent(entity, Sprite, { textureId: 'main.character' , flipX: false })
    loop.world.addComponent(entity, Player, { })

    client.data.entity = entity;

    broadCastData(EventSocket.Connected, buildConnectedDto(loop.world, entity));
}

export function onDisconnected(loop : GameLoop, client : Socket, broadCastData : (event: EventSocket, data : any) => void) {
    console.log(`Client disconnected: ${client.id}`);
    loop.world.removeEntity(client.data.entity);
    broadCastData(EventSocket.Disconnected, client.data.entity);
}

export function onFoodCreated(world : World, broadCastData : (event: EventSocket, data : any) => void) {
    const id = crypto.randomUUID();
    const entity = world.createEntity(id);

    const posX = Math.floor(Math.random()*(WORLD_WIDTH-50));
    const posY = Math.floor(Math.random()*(WORLD_HEIGHT-50));
    world.addComponent(entity, Position, {x: posX, y: posY} as Position);
    world.addComponent(entity, Size, { width: 50, height:50 } as Size);
    world.addComponent(entity, Sprite, { textureId: 'food', flipX: false } as Sprite);
    world.addComponent(entity, Food, {} as Food);

    const pos = world.get(entity, Position);
    const size = world.get(entity, Size);
    const sprite = world.get(entity, Sprite);
    const food = world.get(entity, Food);
 
    const mappedComponent = new Map<string, Component>([
      ['Position', pos as Component],
      ['Size', size as Component],
      ['Sprite', sprite as Component],
      ['SpeedPotion', food as Component]
    ]);

    broadCastData(EventSocket.FoodCreated, buildSingleEntityDto(entity, mappedComponent));
}

export function onFoodIntersect(world : World, broadCastData : (event: EventSocket, data : any) => void)[
  
]