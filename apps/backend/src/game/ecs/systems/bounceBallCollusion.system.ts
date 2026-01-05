import { Ball, Food, Player, Position, Score, Size, Velocity, WORLD_HEIGHT, WORLD_WIDTH } from '@game/shared';
import { World } from '../world';

export function BounceBallCollusionSystem(world: World) {
  for (const e of world.query(Player)) {
    const p1 = world.get(e, Position) as Position;
    const s1 = world.get(e, Size) as Size;

    for (const f of world.query(Ball)) {
      const p2 = world.get(f, Position) as Position;
      const s2 = world.get(f, Size) as Size;
      const velocity = world.get(f, Velocity) as Velocity;

      const isIntersect =
        p1.x < p2.x + s2.width &&
        p1.x + s1.width > p2.x &&
        p1.y < p2.y + s2.height &&
        p1.y + s1.height > p2.y;

      if (isIntersect && velocity.dx * (p2.x - p1.x) < 0) {
        const relativeY = (p2.y+s2.height/2) - (p1.y+s1.height/2);
        const normalize = relativeY/ (s1.height/2);
        const angle = Math.PI/3 * normalize;

        const direction = velocity.dx > 0 ? -1 : 1;

        velocity.dx = Math.cos(angle) * direction;
        velocity.dy = Math.sin(angle);

        velocity.base *= 1.05;
        if(velocity.base> 2000) velocity.base = 2000;
      }

      if(p2.y <= 0) {
        velocity.dy = 1;
      }
      if(p2.y + s2.height >= WORLD_HEIGHT){
        velocity.dy = -1;
      }

      let score : Score | undefined;
      if(p2.x <= 0) {
        score = world.get(world.query(Player).at(-1)!, Score);
        
      }
      if(p2.x + s2.width >= WORLD_WIDTH) {
        score = world.get(world.query(Player).at(0)!, Score);
      }

      if(score != null) {
        score.value +=1;
        p2.x = WORLD_WIDTH/2;
        p2.y = WORLD_HEIGHT/2;
        velocity.base = 800;
        velocity.dx = 1;
        velocity.dy = 0;
      }
    }
  }
}
