import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  EventSocket,
  Food,
  Input,
  Player,
  Position,
  Size,
  Sprite,
  Velocity,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from '@game/shared';
import { GameLoop } from './game.loop';
import type { World } from './ecs/world';
import { buildConnectedDto, buildPositionSnapshot, buildSingleEntityDto } from './dto/dto.builder';
import { Component } from '@game/shared/dist/components/component';

@Injectable()
export class GameService {
  constructor(private readonly loop: GameLoop) {}
  
}
