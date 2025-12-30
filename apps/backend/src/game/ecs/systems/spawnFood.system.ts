import {
  Food,
  Position,
  Size,
  Sprite,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from '@game/shared';
import { World } from '../world';
import { Component } from '@game/shared/dist/components/component';

let number = 0;

export function spawnFoodSystem(world: World) {
  // return;
  number++;
  if (number < 20) return;
  if (world.query(Food).length > 20) return;

  const posX = Math.floor(Math.random() * (WORLD_WIDTH - 50));
  const posY = Math.floor(Math.random() * (WORLD_HEIGHT - 50));

  const newComp = new Map<string, Component>([
    [Position.name, new Position(posX, posY)],
    [Size.name, new Size(50, 50)],
    [Sprite.name, new Sprite('food', false)],
    [Food.name, new Food()],
  ]);

  world.addToAdd(crypto.randomUUID(), newComp);

  number = 0;
}
