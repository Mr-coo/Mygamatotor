import { Injectable } from '@nestjs/common';
import { moveInputSystem } from '../ecs/systems/moveInput.system';
import { jumpInputSystem } from '../ecs/systems/jumpInput.system';
import { movementSystem } from '../ecs/systems/movement.system';
import { World } from '../ecs/world';
import { spawnFoodSystem } from '../ecs/systems/spawnFood.system';
import { Ball, CreateEntityDto, Duration, Entity, EventSocket, Ground, Input, Jump, JustCollided, MovementConstraint, OnGround, Player, Position, Score, Size, Sprite, Velocity, Weight, WORLD_HEIGHT, WORLD_WIDTH } from '@game/shared';
import { EatFoodCollusionSystem } from '../ecs/systems/eatFoodCollusion.system';
import { addEntity } from '../ecs/systems/addEntity.system';
import { removeEntity } from '../ecs/systems/removeEntity.System';
import { sendPosition } from '../ecs/systems/sendPosition.system';
import { sendScore } from '../ecs/systems/sendScore.system';
import { GameLoop } from './game-loop.service';
import { Component } from '@game/shared/dist/components/component';
import { GravitySystem } from '../ecs/systems/gravity.system';
import { BounceBallCollusionSystem } from '../ecs/systems/bounceBallCollusion.system';
import { BeachBallCollusionSystem } from '../ecs/systems/beachBallCollusion.system';
import { durationSystem } from '../ecs/systems/duration.system';

export class BeachBall extends GameLoop {
  world = new World();

  override isValidToJoin() {
    return false;
    return this.playerCount < 2 && !this.isStart;
  }

  override start(){
    if(!this.isValidToJoin()){
      this.isStart = true;

      this.broadCast(EventSocket.CONNECTED, true);

      this.world.addToAdd('duration', new Map<string, Component>([
        [Duration.name, new Duration(60)],
      ]));

      this.run();
    }
  }

  override run() {
    this.addGround();
    this.addBall();
    setInterval(() => {
      this.onTick();
    }, 1000 / this.TICK_RATE);
  }

  override onTick() {
    moveInputSystem(this.world);
    jumpInputSystem(this.world);
    GravitySystem(this.world);
    BeachBallCollusionSystem(this.world);
    movementSystem(this.world, this.DT);
    durationSystem(this.world, this.DT, this.broadCast);

    addEntity(this.world, this.broadCast);
    removeEntity(this.world, this.broadCast);
    sendPosition(this.world, this.broadCast);
    sendScore(this.world, this.broadCast);
  }

  override addPlayer(clientId: string) {
    const playerData = new Map<string, Component>([
      [Position.name, new Position(WORLD_WIDTH/2, WORLD_HEIGHT/3 - 150)],
      [Velocity.name, new Velocity(800)],
      [Input.name, new Input()],
      [Size.name, new Size(150, 150)],
      [Sprite.name, new Sprite('wendy', false)],
      [Player.name, new Player()],
      [Score.name, new Score()],
      [Jump.name, new Jump(true)],
      [Weight.name, new Weight(1)],
      [OnGround.name, new OnGround(false)],
      [MovementConstraint.name, new MovementConstraint(true, false)],
    ]);

    this.incPlayer();
    this.world.addToAdd(clientId, playerData);
  }

  addGround(){
    const groundData = new Map<string, Component>([
      [Position.name, new Position(0, WORLD_HEIGHT*2/3)],
      [Size.name, new Size(WORLD_WIDTH, WORLD_HEIGHT)],
      [Sprite.name, new Sprite('ground', false)],
      [MovementConstraint.name, new MovementConstraint(false, false)],
      [Ground.name, new Ground()],
    ]);
    this.world.addToAdd('ground', groundData);
  }
  
  addBall(){
    this.world.addToAdd('ball', new Map<string, Component>([
      [Position.name, new Position(WORLD_WIDTH/2, WORLD_HEIGHT/2-350)],
      [Velocity.name, new Velocity(800, 0, 0)],
      [Size.name, new Size(100, 100)],
      [Sprite.name, new Sprite('ball', false)],
      [Ball.name, new Ball()],
      [OnGround.name, new OnGround(false)],
      [Weight.name, new Weight(0.5)],
      [JustCollided.name, new JustCollided()],
      [MovementConstraint.name, new MovementConstraint(true, true)],
    ]));
  }
}
