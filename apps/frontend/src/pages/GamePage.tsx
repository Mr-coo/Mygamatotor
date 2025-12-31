import { useEffect, useRef } from "react";
import { startGameLoop } from "../game/gameLoop";
import { World } from "../ecs/world";
import { networkClient } from "../network/networkClient";
import { EventSocket, WORLD_HEIGHT, WORLD_WIDTH } from "@game/shared";
import { onConnected, onRemoveEntity, onCreateEntity, onPosition, onScore } from "../network/eventHandle";
import { useGameStore } from "../store/game.store";

export function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scores = useGameStore((state)=> state.scores);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const world = new World();
    networkClient.connect();

    networkClient.on(EventSocket.CONNECTED, (data) => onConnected(world, data));
    networkClient.on(EventSocket.POSITION, (data) => onPosition(world, data));
    networkClient.on(EventSocket.REMOVE_ENTITY, (data) => onRemoveEntity(world, data));
    networkClient.on(EventSocket.CREATE_ENTITY, (data) => onCreateEntity(world, data));
    networkClient.on(EventSocket.SCORE, (data) => onScore(world, data));

    startGameLoop(world, ctx);
    
    return () => {
      networkClient.disconnect();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={WORLD_WIDTH} height={WORLD_HEIGHT} />
      <ul>
        {Object.entries(scores).map(([entity, score]) => (
          <li key={entity}>
            {entity}: {score}
          </li>
        ))}
      </ul>
    </>
  );
}