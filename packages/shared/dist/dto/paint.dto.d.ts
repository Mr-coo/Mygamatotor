import { Entity } from "../entities/entity.js";
export declare class PaintDto {
    paints: Record<Entity, string>;
    constructor(paints: Record<Entity, string>);
}
