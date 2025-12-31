import { Score } from "../components/score.js";
import { Entity } from "../entities/entity.js";

export class ScoreDto {
    scores : Record<Entity, Score>;

    constructor(scores: Record<Entity, Score>){
        this.scores = scores;
    }
}