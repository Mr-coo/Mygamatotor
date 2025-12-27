import { Position, Size, Sprite, WORLD_HEIGHT, WORLD_WIDTH } from "@game/shared";
import type { World } from "../world";
import { getImage } from "../../util/assets";

let number = 0;
export function renderSystem(
  ctx: CanvasRenderingContext2D,
  world: World,
  dt: number
) {
  number += 0.1;
  ctx.drawImage(getImage('background'), 0, 0, WORLD_WIDTH, WORLD_HEIGHT)
  
  for(const e of world.query(Position, Size, Sprite)) {
    ctx.save();
    const position = world.get(e, Position) as Position;
    const size = world.get(e, Size) as Size;
    const sprite = world.get(e, Sprite) as Sprite;

    const cx = position.x + size.width / 2;
    const cy = position.y + size.height / 2;

    ctx.translate(cx, cy);
    if(sprite.textureId == 'food'){
      const scaleConst = Math.sin(number/5)/10 + 1; 
      ctx.scale(scaleConst, scaleConst);
    }

    ctx.drawImage(getImage(sprite.textureId.toString()), -size.width/2, -size.height/2, size.width, size.height);

    ctx.restore();
  }
}
