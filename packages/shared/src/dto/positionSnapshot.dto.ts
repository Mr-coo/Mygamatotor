import { Entity } from "../entities/entity.js";
import { Component } from "../components/component.js";
import { Position } from "../components/position.js";

export class PositionSnapshot {
  positions: Record<Entity, Position>;

  constructor(positions: Record<Entity, Position>,) {
    this.positions = positions;
  }
}
