import { Ball, Ground, Player, Position, Score, Size, Velocity, WORLD_HEIGHT, WORLD_WIDTH } from '@game/shared';
import { World } from '../world';

const RESET_BALL_HEIGHT_ABOVE_GROUND = 350;

export function beachBallScoringSystem(world: World) {
  let groundTop = Infinity;
  for (const g of world.query(Ground)) {
    const gp = world.get(g, Position) as Position;
    if (gp.y < groundTop) groundTop = gp.y;
  }
  if (!isFinite(groundTop)) return;

  for (const ball of world.query(Ball)) {
    const bp = world.get(ball, Position) as Position;
    const bs = world.get(ball, Size) as Size;
    const bv = world.get(ball, Velocity) as Velocity;

    if (bp.y + bs.height < groundTop) continue;

    const ballLandedLeft = bp.x + bs.width / 2 < WORLD_WIDTH / 2;

    for (const player of world.query(Player, Score, Position, Size)) {
      const pp = world.get(player, Position) as Position;
      const ps = world.get(player, Size) as Size;
      const playerOnLeft = pp.x + ps.width / 2 < WORLD_WIDTH / 2;

      if (playerOnLeft !== ballLandedLeft) {
        const score = world.get(player, Score) as Score;
        score.value += 1;
      }
    }

    bp.x = WORLD_WIDTH / 2 - bs.width / 2;
    bp.y = groundTop - RESET_BALL_HEIGHT_ABOVE_GROUND - bs.height;
    bv.dx = 0;
    bv.dy = 0;
  }
}
