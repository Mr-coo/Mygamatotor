import { Position, Size, Sprite, WORLD_HEIGHT, WORLD_WIDTH } from "@game/shared";
import { World } from "../world";

let number = 0;

export function spawnFoodSystem(world: World) {
    number++;
    if(number < 20) return;

    const entity = world.createEntity(crypto.randomUUID());

    const posX = Math.floor(Math.random()*(WORLD_WIDTH-50));
    const posY = Math.floor(Math.random()*(WORLD_HEIGHT-50));
    world.addComponent(entity, Position, {x: posX, y: posY} as Position);
    world.addComponent(entity, Size, { width: 50, height:50 } as Size);
    world.addComponent(entity, Sprite, { textureId: 'food', flipX: false } as Sprite);

    number = 0;
}