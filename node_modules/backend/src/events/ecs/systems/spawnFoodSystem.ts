import { EventSocket, Position, Size, Sprite, WORLD_HEIGHT, WORLD_WIDTH } from "@game/shared";
import { World } from "../world";
import { onFoodCreated } from "src/events/event.handle";

let number = 0;

export function spawnFoodSystem(world: World, broadCastData : (event : EventSocket, data : any) => void) {
    number++;
    if(number < 20) return;

    onFoodCreated(world, broadCastData);

    number = 0;
}