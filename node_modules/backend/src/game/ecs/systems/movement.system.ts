import {
  Ball,
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

    const speed = velocity.base;

    const magnitude = Math.sqrt(
      velocity.dx * velocity.dx + velocity.dy * velocity.dy,
    );

    if (magnitude > 0) {
      velocity.dx /= magnitude;
      velocity.dy /= magnitude;
    }

    const newX = position.x + velocity.dx * deltaTime * speed;
    const newY = position.y + velocity.dy * deltaTime * speed;

    position.x = newX;
    if(position.x <= 0) position.x = 0;
    else if(position.x >= WORLD_WIDTH-size.width) position.x = WORLD_WIDTH-size.width;

    position.y = newY;
    if (newY <= 0) position.y = 0;
    else if(newY >= WORLD_HEIGHT-size.height) position.y = WORLD_HEIGHT-size.height;

    // if(world.get(e, Ball) != null)
      // console.log(e, 'pos y ball', position.y);
  }
}
