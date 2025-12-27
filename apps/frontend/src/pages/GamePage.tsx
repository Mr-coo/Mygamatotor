import { useEffect, useRef } from "react";
import { startGameLoop } from "../game/gameLoop";
import { World } from "../ecs/world";
import { networkClient } from "../network/client";
import { EventSocket, WORLD_HEIGHT, WORLD_WIDTH } from "@game/shared";
import { onConnected, onDisconnected, onPositionSnapshot } from "../network/handle.event";

export function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const world = new World();

    networkClient.on(EventSocket.Connected, (data) => onConnected(world, data, networkClient.getClientId()!));
    networkClient.on(EventSocket.PositionSnapshot, (data) => onPositionSnapshot(world, data));
    networkClient.on(EventSocket.Disconnected, (data) => onDisconnected(world, data));

    startGameLoop(world, ctx, networkClient);
    
    return () => {};
  }, []);

  return <canvas ref={canvasRef} width={WORLD_WIDTH} height={WORLD_HEIGHT} />;
}
