import { Score } from "../components/score.js";
import { Entity } from "../entities/entity.js";
export declare class ScoreDto {
    scores: Record<Entity, Score>;
    constructor(scores: Record<Entity, Score>);
}
