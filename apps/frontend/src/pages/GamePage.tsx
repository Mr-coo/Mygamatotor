import { useEffect, useRef } from "react";
import { startGameLoop } from "../game/gameLoop";
import { World } from "../ecs/world";
import { networkClient } from "../network/socket/networkClient";
import { EventSocket, WORLD_HEIGHT, WORLD_WIDTH } from "@game/shared";
import { onConnected, onRemoveEntity, onCreateEntity, onPosition, onScore } from "../network/socket/eventHandle";
import { useGameStore } from "../store/game.store"; 
import wave from "../assets/wave.png"

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
      <ul className="fixed top-10 right-10 z-10 bg-blue-100 text-orange-400 rounded space-y-1 m-0 w-72 opacity-50 hover:opacity-100">
        <img src={wave} alt="" />
        {Object.entries(scores).map(([entity, score]) => (
          <li key={entity} className="p-3 flex justify-between items-center">
            <p>{entity}</p>
            <p>{score}</p>
          </li>
        ))}
      </ul>

      <canvas
        ref={canvasRef}
        width={WORLD_WIDTH}
        height={WORLD_HEIGHT}
        className="fixed inset-0 w-screen h-screen z-0 block"
      />
    </>
  );
}