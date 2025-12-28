import { Position } from "../components/position.js";
import { Entity } from "../entities/entity.js";

export class PositionDto {
  positions: Record<Entity, Position>;

  constructor(positions: Record<Entity, Position>,) {
    this.positions = positions;
  }
}