import { Injectable } from '@nestjs/common';
import { inputSystem } from '../ecs/systems/input.system';
import { movementSystem } from '../ecs/systems/movement.system';
import { World } from '../ecs/world';
import { spawnFoodSystem } from '../ecs/systems/spawnFood.system';
import { CreateEntityDto, Entity, EventSocket, Input, MovementConstraint, Player, Position, Score, Size, Sprite, Velocity, WORLD_HEIGHT, WORLD_WIDTH } from '@game/shared';
import { EatFoodCollusionSystem } from '../ecs/systems/eatFoodCollusion.system';
import { addEntity } from '../ecs/systems/addEntity.system';
import { removeEntity } from '../ecs/systems/removeEntity.System';
import { sendPosition } from '../ecs/systems/sendPosition.system';
import { sendScore } from '../ecs/systems/sendScore.system';
import { GameLoop } from './game-loop.service';
import { Component } from '@game/shared/dist/components/component';

export class FightOverFood extends GameLoop {
  world = new World();

  override isValidToJoin() {
      return this.playerCount < 2 && !this.isStart;
  }

  override start(){
    if(!this.isValidToJoin()){
      this.isStart = true;

      this.broadCast(EventSocket.CONNECTED, true);

      this.run();
    }
  }

  override run() {
    setInterval(() => {
      this.onTick();
    }, 1000 / this.TICK_RATE);
  }

  override onTick() {
    inputSystem(this.world);
    movementSystem(this.world, this.DT);
    spawnFoodSystem(this.world);
    EatFoodCollusionSystem(this.world);

    addEntity(this.world, this.broadCast);
    removeEntity(this.world, this.broadCast);
    sendPosition(this.world, this.broadCast);
    sendScore(this.world, this.broadCast);
  }

  override addPlayer(clientId: string) {
    const playerData = new Map<string, Component>([
      [Position.name, new Position(WORLD_WIDTH/2, WORLD_HEIGHT/2)],
      [Velocity.name, new Velocity(800)],
      [Input.name, new Input()],
      [Size.name, new Size(150, 150)],
      [Sprite.name, new Sprite('wendy', false)],
      [Player.name, new Player()],
      [Score.name, new Score()],
      [MovementConstraint.name, new MovementConstraint(true, true)],
    ]);

    this.incPlayer();
    this.world.addToAdd(clientId, playerData);
  }
}
