import { Ball, Food, Ground, JustCollided, OnGround, Player, Position, Score, Size, Velocity, WORLD_HEIGHT, WORLD_WIDTH } from '@game/shared';
import { World } from '../world';
import { sign } from 'crypto';

export function BeachBallCollusionSystem(world: World) {
  for (const e of world.query(Player)) {
    const p1 = world.get(e, Position) as Position;
    const s1 = world.get(e, Size) as Size;
    const velocity = world.get(e, Velocity) as Velocity;
    const onGround = world.get(e, OnGround) as OnGround;

    for (const f of world.query(Ground)) {
      const p2 = world.get(f, Position) as Position;
      const s2 = world.get(f, Size) as Size;

      const isIntersect =
        p1.x < p2.x + s2.width &&
        p1.x + s1.width > p2.x &&
        p1.y < p2.y + s2.height &&
        p1.y + s1.height > p2.y;

      if (isIntersect && velocity.dy > 0) {
        velocity.dy = 0;
        onGround.value = true;
      }
    }
  }

  for (const e of world.query(Ball)) {
    const p1 = world.get(e, Position) as Position;
    const s1 = world.get(e, Size) as Size;
    const velocity = world.get(e, Velocity) as Velocity;
    const onGround = world.get(e, OnGround) as OnGround;

    for (const f of world.query(Ground)) {
      const p2 = world.get(f, Position) as Position;
      const s2 = world.get(f, Size) as Size;

      const isIntersect =
        p1.x < p2.x + s2.width &&
        p1.x + s1.width > p2.x &&
        p1.y < p2.y + s2.height &&
        p1.y + s1.height > p2.y;

      if (isIntersect && velocity.dy > 0) {
        velocity.dy *= -0.8;
        onGround.value = true;
      }
    }

    if(p1.y <= 0 || p1.y + s1.height >= WORLD_HEIGHT){
      velocity.dy *= -0.8;
    }

    if(p1.x <= 0 || p1.x + s1.width >= WORLD_WIDTH){
      velocity.dx *= -0.8;
    }
  }

  for (const e of world.query(Ball)) {
    const p1 = world.get(e, Position) as Position;
    const s1 = world.get(e, Size) as Size;
    const v1 = world.get(e, Velocity) as Velocity;
    const just = world.get(e, JustCollided) as JustCollided;

    just.value = false;

    for (const f of world.query(Player)) {
      const p2 = world.get(f, Position) as Position;
      const s2 = world.get(f, Size) as Size;
      const v2 = world.get(f, Velocity) as Velocity;

      const isIntersect =
        p1.x < p2.x + s2.width &&
        p1.x + s1.width > p2.x &&
        p1.y < p2.y + s2.height &&
        p1.y + s1.height > p2.y;

      if (!isIntersect || just.value) continue;

      const overlapX =
        Math.min(p1.x + s1.width, p2.x + s2.width) -
        Math.max(p1.x, p2.x);

      const overlapY =
        Math.min(p1.y + s1.height, p2.y + s2.height) -
        Math.max(p1.y, p2.y);

      const transfer = 0.6;

      // Apply player momentum
      v1.dx += v2.dx * transfer;
      v1.dy += v2.dy * transfer;

      if (overlapX < overlapY) {
        // side hit
        if (p1.x < p2.x) p1.x -= overlapX;
        else p1.x += overlapX;

        v1.dx *= -0.9;
      } else {
        // top / bottom hit
        if (p1.y < p2.y) {
          p1.y -= overlapY; // player kicks ball
          v1.dy = -Math.abs(v1.dy) * 0.9;
        } else {
          p1.y += overlapY;
          v1.dy *= -0.5;
        }
      }

      // Clamp
      v1.dx = Math.max(-3, Math.min(3, v1.dx));
      v1.dy = Math.max(-3, Math.min(3, v1.dy));

      just.value = true;
    }
  }
}
