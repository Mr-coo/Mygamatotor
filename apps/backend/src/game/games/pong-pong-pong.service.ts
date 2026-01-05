import { Injectable } from '@nestjs/common';
import { inputSystem } from '../ecs/systems/input.system';
import { movementSystem } from '../ecs/systems/movement.system';
import { World } from '../ecs/world';
import { spawnFoodSystem } from '../ecs/systems/spawnFood.system';
import { Ball, CreateEntityDto, Entity, EventSocket, Input, MovementConstraint, Player, Position, Score, Size, Sprite, Velocity, WORLD_HEIGHT, WORLD_WIDTH } from '@game/shared';
import { BounceBallCollusionSystem } from '../ecs/systems/bounceBallCollusion.system';
import { addEntity } from '../ecs/systems/addEntity.system';
import { removeEntity } from '../ecs/systems/removeEntity.System';
import { sendPosition } from '../ecs/systems/sendPosition.system';
import { sendScore } from '../ecs/systems/sendScore.system';
import { GameLoop } from './game-loop.service';
import { Component } from '@game/shared/dist/components/component';

export class PongPongPong extends GameLoop {
  world = new World();

  override isValidToJoin() {
      return this.playerCount < 2 && !this.isStart;
  }

  override start(){
    if(!this.isValidToJoin()){
      this.isStart = true;
      this.broadCast(EventSocket.CONNECTED, true);
      
      this.world.addToAdd('ball', new Map<string, Component>([
        [Position.name, new Position(WORLD_WIDTH/2, WORLD_HEIGHT/2)],
        [Velocity.name, new Velocity(800, 1, 0)],
        [Size.name, new Size(100, 100)],
        [Sprite.name, new Sprite('ball', false)],
        [Ball.name, new Ball()],
        [MovementConstraint.name, new MovementConstraint(true, true)],
      ]));

      this.run();
    }
  }

  override run() {
    setInterval(() => {
      this.onTick();
    }, 100 / this.TICK_RATE);
  }

  override onTick() {
    inputSystem(this.world);
    movementSystem(this.world, this.DT);
    BounceBallCollusionSystem(this.world);

    addEntity(this.world, this.broadCast);
    removeEntity(this.world, this.broadCast);
    sendPosition(this.world, this.broadCast);
    sendScore(this.world, this.broadCast);
  }

  override addPlayer(clientId: string) {

    const playerData = new Map<string, Component>([
      [Position.name, new Position((this.playerCount==0?150:(WORLD_WIDTH-150-200)), WORLD_HEIGHT/2)],
      [Velocity.name, new Velocity(1200)],
      [Input.name, new Input()],
      [Size.name, new Size(250, 350)],
      [Sprite.name, new Sprite('tang', false)],
      [Player.name, new Player()],
      [Score.name, new Score()],
      [MovementConstraint.name, new MovementConstraint(false, true)],
    ]);

    this.incPlayer();
    this.world.addToAdd(clientId, playerData);
  }
}
