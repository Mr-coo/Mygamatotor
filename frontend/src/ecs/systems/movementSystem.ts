import type { Position } from "../components/position";
import type { Velocity } from "../components/velocity";
import type { World } from "../entities/world";

export function movementSystem(world: World, deltaTime: number) {
    const pos = world.getComponent<Position>('position');
    const vel = world.getComponent<Velocity>('velocity');

    if (!pos || !vel) return;

    for (const [entity, position] of pos) {
        const velocity = vel.get(entity);
        if (!velocity) continue;

        position.x += velocity.dx * deltaTime;
        position.y += velocity.dy * deltaTime;
    }
}