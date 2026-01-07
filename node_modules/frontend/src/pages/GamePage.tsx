import { useEffect, useRef, useState } from "react";
import { startGameLoop } from "../game/gameLoop";
import { World } from "../ecs/world";
import { networkClient } from "../network/socket/networkClient";
import { EventSocket, WORLD_HEIGHT, WORLD_WIDTH } from "@game/shared";
import { useGameStore } from "../store/game.store"; 
import wave from "../assets/wave.png"
import { EventHandle } from "../network/socket/eventHandle";
import { useLocation, useNavigate } from "react-router-dom";

export function GamePage() {  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scores = useGameStore((state)=> state.scores);
  const [isStart, setIsStart] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const gameName = location.state;

  useEffect(() => {
    if(gameName == null) navigate('/game-menu');

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const world = new World();
    networkClient.connect();
    networkClient.sendCommand(EventSocket.JOIN, gameName);

    networkClient.on(EventSocket.CONNECTED, (data) => {EventHandle.onConnected(world, data);setIsStart(true);});
    networkClient.on(EventSocket.POSITION, (data) => EventHandle.onPosition(world, data));
    networkClient.on(EventSocket.REMOVE_ENTITY, (data) => EventHandle.onRemoveEntity(world, data));
    networkClient.on(EventSocket.CREATE_ENTITY, (data) => EventHandle.onCreateEntity(world, data));
    networkClient.on(EventSocket.SCORE, (data) => EventHandle.onScore(world, data));

    startGameLoop(world, ctx);
    
    return () => {
      networkClient.disconnect();
    };
  }, []);


  return (
    <>
      {!isStart && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 text-white text-2xl">
          <h3>Waiting for other player...</h3>
        </div>
      )}

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