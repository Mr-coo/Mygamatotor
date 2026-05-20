import { Duration, EventSocket, Input, MovementConstraint, Paintable, Painter, Player, Position, Score, Size, Sprite, Velocity, WORLD_HEIGHT, WORLD_WIDTH } from '@game/shared';
import { World } from '../ecs/world';
import { moveInputSystem } from '../ecs/systems/moveInput.system';
import { movementSystem } from '../ecs/systems/movement.system';
import { addEntity } from '../ecs/systems/addEntity.system';
import { removeEntity } from '../ecs/systems/removeEntity.System';
import { sendPosition } from '../ecs/systems/sendPosition.system';
import { sendScore } from '../ecs/systems/sendScore.system';
import { durationSystem } from '../ecs/systems/duration.system';
import { paintTrailSystem } from '../ecs/systems/paintTrail.system';
import { paintScoringSystem } from '../ecs/systems/paintScoring.system';
import { sendPaint } from '../ecs/systems/sendPaint.system';
import { GameLoop } from './game-loop.service';
import { Component } from '@game/shared/dist/components/component';

const TILE_SIZE = 20;
const COLS = Math.floor(WORLD_WIDTH / TILE_SIZE);
const ROWS = Math.floor(WORLD_HEIGHT / TILE_SIZE);

const STARTER_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#a855f7'];

export class Paint extends GameLoop {
  world = new World();

  override isValidToJoin() {
    return this.playerCount < 2 && !this.isStart;
  }

  override start() {
    if (!this.isValidToJoin()) {
      this.isStart = true;

      this.broadCast(EventSocket.CONNECTED, true);

      this.world.addToAdd('duration', new Map<string, Component>([
        [Duration.name, new Duration(120)],
      ]));

      this.spawnGrid();
      this.run();
    }
  }

  override run() {
    setInterval(() => {
      this.onTick();
    }, 1000 / this.TICK_RATE);
  }

  override onTick() {
    moveInputSystem(this.world);
    movementSystem(this.world, this.DT);
    paintTrailSystem(this.world);
    paintScoringSystem(this.world);
    durationSystem(this.world, this.DT, this.broadCast);

    addEntity(this.world, this.broadCast);
    removeEntity(this.world, this.broadCast);
    sendPosition(this.world, this.broadCast);
    sendScore(this.world, this.broadCast);
    sendPaint(this.world, this.broadCast);
  }

  override addPlayer(clientId: string) {
    const isFirst = this.playerCount === 0;
    const colorIndex = this.playerCount % STARTER_COLORS.length;
    const color = STARTER_COLORS[colorIndex];
    const playerWidth = 150;
    const spawnX = isFirst
      ? WORLD_WIDTH / 4 - playerWidth / 2
      : (3 * WORLD_WIDTH) / 4 - playerWidth / 2;
    const sprite = isFirst ? 'wendy' : 'tang';

    const playerData = new Map<string, Component>([
      [Position.name, new Position(spawnX, WORLD_HEIGHT / 2 - playerWidth / 2)],
      [Velocity.name, new Velocity(800)],
      [Input.name, new Input()],
      [Size.name, new Size(playerWidth, playerWidth)],
      [Sprite.name, new Sprite(sprite, false)],
      [Player.name, new Player()],
      [Score.name, new Score()],
      [Painter.name, new Painter(color, 30)],
      [MovementConstraint.name, new MovementConstraint(true, true)],
    ]);

    this.incPlayer();
    this.world.addToAdd(clientId, playerData);
  }

  private spawnGrid() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const id = `tile_${col}_${row}`;
        this.world.addToAdd(id, new Map<string, Component>([
          [Position.name, new Position(col * TILE_SIZE, row * TILE_SIZE)],
          [Size.name, new Size(TILE_SIZE, TILE_SIZE)],
          [Paintable.name, new Paintable(null)],
        ]));
      }
    }
  }
}
