import {
  Ball,
  Ground,
  JustCollided,
  Net,
  OnGround,
  Player,
  Position,
  Size,
  Velocity,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from '@game/shared';
import { World } from '../world';

const GROUND_RESTITUTION = 0.88;
const WALL_RESTITUTION = 0.9;
const GROUND_FRICTION = 0.97;
const AIR_DRAG = 0.9995;
const REST_THRESHOLD = 0.15;
const MAX_SPEED = 1.5;

export function BeachBallCollusionSystem(world: World) {
  let groundTop = Infinity;
  for (const g of world.query(Ground)) {
    const gp = world.get(g, Position) as Position;
    if (gp.y < groundTop) groundTop = gp.y;
  }

  for (const e of world.query(Player)) {
    const p1 = world.get(e, Position) as Position;
    const s1 = world.get(e, Size) as Size;
    const velocity = world.get(e, Velocity) as Velocity;
    const onGround = world.get(e, OnGround) as OnGround;

    onGround.value = false;

    for (const f of world.query(Ground)) {
      const p2 = world.get(f, Position) as Position;
      const s2 = world.get(f, Size) as Size;

      const isIntersect =
        p1.x < p2.x + s2.width &&
        p1.x + s1.width > p2.x &&
        p1.y < p2.y + s2.height &&
        p1.y + s1.height > p2.y;

      if (isIntersect && velocity.dy >= 0) {
        p1.y = p2.y - s1.height;
        velocity.dy = 0;
        onGround.value = true;
      }
    }

    for (const n of world.query(Net)) {
      const np = world.get(n, Position) as Position;
      const ns = world.get(n, Size) as Size;

      const isIntersect =
        p1.x < np.x + ns.width &&
        p1.x + s1.width > np.x &&
        p1.y < np.y + ns.height &&
        p1.y + s1.height > np.y;

      if (!isIntersect) continue;

      const playerCenterX = p1.x + s1.width / 2;
      const netCenterX = np.x + ns.width / 2;
      if (playerCenterX < netCenterX) {
        p1.x = np.x - s1.width;
      } else {
        p1.x = np.x + ns.width;
      }
    }
  }

  for (const e of world.query(Ball)) {
    const p1 = world.get(e, Position) as Position;
    const s1 = world.get(e, Size) as Size;
    const v = world.get(e, Velocity) as Velocity;
    const onGround = world.get(e, OnGround) as OnGround;

    v.dx *= AIR_DRAG;
    v.dy *= AIR_DRAG;

    onGround.value = false;

    for (const f of world.query(Ground)) {
      const p2 = world.get(f, Position) as Position;
      const s2 = world.get(f, Size) as Size;

      const isIntersect =
        p1.x < p2.x + s2.width &&
        p1.x + s1.width > p2.x &&
        p1.y < p2.y + s2.height &&
        p1.y + s1.height > p2.y;

      if (!isIntersect) continue;

      p1.y = p2.y - s1.height;

      if (v.dy > 0) {
        v.dy = -v.dy * GROUND_RESTITUTION;
      }

      v.dx *= GROUND_FRICTION;

      if (Math.abs(v.dy) < REST_THRESHOLD) {
        v.dy = 0;
        onGround.value = true;
      }
      if (Math.abs(v.dx) < REST_THRESHOLD * 0.5) {
        v.dx = 0;
      }
    }

    if (p1.y <= 0 && v.dy < 0) {
      p1.y = 0;
      v.dy = -v.dy * WALL_RESTITUTION;
    } else if (p1.y + s1.height >= WORLD_HEIGHT && v.dy > 0) {
      p1.y = WORLD_HEIGHT - s1.height;
      v.dy = -v.dy * WALL_RESTITUTION;
    }

    if (p1.x <= 0 && v.dx < 0) {
      p1.x = 0;
      v.dx = -v.dx * WALL_RESTITUTION;
    } else if (p1.x + s1.width >= WORLD_WIDTH && v.dx > 0) {
      p1.x = WORLD_WIDTH - s1.width;
      v.dx = -v.dx * WALL_RESTITUTION;
    }

    for (const n of world.query(Net)) {
      const np = world.get(n, Position) as Position;
      const ns = world.get(n, Size) as Size;

      const isIntersect =
        p1.x < np.x + ns.width &&
        p1.x + s1.width > np.x &&
        p1.y < np.y + ns.height &&
        p1.y + s1.height > np.y;

      if (!isIntersect) continue;

      const overlapX =
        Math.min(p1.x + s1.width, np.x + ns.width) -
        Math.max(p1.x, np.x);
      const overlapY =
        Math.min(p1.y + s1.height, np.y + ns.height) -
        Math.max(p1.y, np.y);

      if (overlapX < overlapY) {
        if (p1.x + s1.width / 2 < np.x + ns.width / 2) {
          p1.x = np.x - s1.width;
          if (v.dx > 0) v.dx = -v.dx * WALL_RESTITUTION;
        } else {
          p1.x = np.x + ns.width;
          if (v.dx < 0) v.dx = -v.dx * WALL_RESTITUTION;
        }
      } else {
        if (p1.y + s1.height / 2 < np.y + ns.height / 2) {
          p1.y = np.y - s1.height;
          if (v.dy > 0) v.dy = -v.dy * GROUND_RESTITUTION;
        } else {
          p1.y = np.y + ns.height;
          if (v.dy < 0) v.dy = -v.dy * WALL_RESTITUTION;
        }
      }
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

      const ballCenterX = p1.x + s1.width / 2;
      const ballCenterY = p1.y + s1.height / 2;
      const playerCenterX = p2.x + s2.width / 2;
      const playerCenterY = p2.y + s2.height / 2;

      const transfer = 0.5;
      v1.dx += v2.dx * transfer;
      v1.dy += v2.dy * transfer;

      if (overlapX < overlapY) {
        if (ballCenterX < playerCenterX) {
          p1.x -= overlapX;
          v1.dx = -Math.abs(v1.dx) * 0.9 - 0.5;
        } else {
          p1.x += overlapX;
          v1.dx = Math.abs(v1.dx) * 0.9 + 0.5;
        }
      } else {
        if (ballCenterY < playerCenterY) {
          p1.y -= overlapY;
          v1.dy = -Math.abs(v1.dy) * 0.9 - 1.5;
        } else {
          const maxBallY = groundTop - s1.height;
          const targetBallY = p1.y + overlapY;
          if (targetBallY > maxBallY) {
            const remainder = targetBallY - maxBallY;
            p1.y = maxBallY;
            p2.y -= remainder;
            if (v2.dy > 0) v2.dy = 0;
            v1.dy = 0;
          } else {
            p1.y = targetBallY;
            v1.dy = Math.abs(v1.dy) * 0.5;
          }
        }
      }

      v1.dx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, v1.dx));
      v1.dy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, v1.dy));

      just.value = true;
    }
  }
}
