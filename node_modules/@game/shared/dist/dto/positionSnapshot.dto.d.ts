import { Entity } from "../entities/entity.js";
import { Position } from "../components/position.js";
export declare class PositionSnapshot {
    positions: Record<Entity, Position>;
    constructor(positions: Record<Entity, Position>);
}
