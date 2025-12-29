import {
  Position,
  Size,
  Velocity,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from '@game/shared';
import { World } from '../world';

export function movementSystem(world: World, deltaTime: number) {
  for (const e of world.query(Position, Velocity, Size)) {
    const position = world.get(e, Position) as Position;
    const size = world.get(e, Size) as Size;
    const velocity = world.get(e, Velocity) as Velocity;

    const speed = 200;

    const magnitude = Math.sqrt(
      velocity.dx * velocity.dx + velocity.dy * velocity.dy,
    );

    if (magnitude > 0) {
      velocity.dx /= magnitude;
      velocity.dy /= magnitude;
    }

    const newX = position.x + velocity.dx * deltaTime * speed;
    const newY = position.y + velocity.dy * deltaTime * speed;

    if (newX >= 0 && newX < WORLD_WIDTH - size.width) position.x = newX;
    else position.x = WORLD_WIDTH - size.width;
    if (newY >= 0 && newY < WORLD_HEIGHT - size.height) position.y = newY;
  }
}
