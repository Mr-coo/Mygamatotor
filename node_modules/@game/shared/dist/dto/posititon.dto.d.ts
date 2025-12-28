import { Position } from "../components/position.js";
import { Entity } from "../entities/entity.js";
export declare class PositionDto {
    positions: Record<Entity, Position>;
    constructor(positions: Record<Entity, Position>);
}
