import { Entity } from "../entities/entity.js";

export class PaintDto {
  paints: Record<Entity, string>;

  constructor(paints: Record<Entity, string>) {
    this.paints = paints;
  }
}
