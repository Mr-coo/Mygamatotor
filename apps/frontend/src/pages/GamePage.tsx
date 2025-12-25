import { Component, useEffect, useRef } from "react";
import { bindKeyboard } from "../util/keyboardInputBind";
import { EventSocket, Input, Position, Snapshot, Velocity, type Entity } from "@game/shared";
import { startGameLoop } from "../game/gameLoop";
import { World } from "../ecs/world";
import { networkClient } from "../network/client";

export function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const world = new World();

    networkClient.on(EventSocket.Snapshot, (snapshot) => {
      if(snapshot.components === undefined || snapshot.entities === undefined) {
        return;
      }
      world.components = new Map<string, Map<Entity, Component>>(
        Object.entries(snapshot.components).map(([name, obj]) => [
          name,
          new Map(Object.entries(obj as Record<Entity, Component>) as [Entity, Component][])
        ])
      );
      world.entities = new Set(snapshot.entities);

      bindKeyboard(world, networkClient.getClientId()??'');
    });

    startGameLoop(world, ctx, networkClient);
    
    return () => {};
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
