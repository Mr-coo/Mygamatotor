import { useEffect, useRef } from "react";
import { bindKeyboard } from "../util/keyboardInputBind";
import { NetworkClient } from "../network/client";
import { Input, Position, Velocity } from "@game/shared";
import { startGameLoop } from "../game/gameLoop";
import { World } from "../ecs/world";

export function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const netWorkClient = new NetworkClient();

    const world = new World();

    const player = world.createEntity();
    world.addComponent(player, Position, { x: 100, y: 100 } as Position);
    world.addComponent(player, Velocity, { dx: 0, dy: 0 } as Velocity);
    world.addComponent(player, Input, {
        up: false,
        down: false,
        left: false,
        right: false
    } as Input);

    netWorkClient.on((data) =>{
      console.log("Received data from server:", data);
    })

    bindKeyboard(world, player);

    startGameLoop(world, ctx, netWorkClient);
    
    return () => {};
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
