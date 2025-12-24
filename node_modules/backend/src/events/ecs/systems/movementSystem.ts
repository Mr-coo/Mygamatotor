import { Position, Velocity } from "@game/shared";
import { World } from "../world";

export function movementSystem(world: World, deltaTime: number) {
    for(const e of world.query(Position, Velocity)) {
        const position = world.get(e, Position) as Position;
        const velocity = world.get(e, Velocity) as Velocity;

        position.x += velocity.dx * deltaTime;
        position.y += velocity.dy * deltaTime;
    }
}