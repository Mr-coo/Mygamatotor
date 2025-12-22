import { useEffect, useRef } from "react";
import { World } from "../ecs/entities/world";
import { startGameLoop } from "../game/gameLoop";
import type { Position } from "../ecs/components/position";
import type { Velocity } from "../ecs/components/velocity";
import type { Input } from "../ecs/components/input";

export function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const world = new World();

    const player = world.createEntity();
    world.addComponent(player, 'position', { x: 100, y: 100 } as Position);
    world.addComponent(player, 'velocity', { dx: 50, dy: 0 } as Velocity);
    world.addComponent(player, 'input', {
        up: false,
        down: false,
        left: false,
        right: false
    } as Input);

    startGameLoop(world, ctx);

    return () => {};
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
