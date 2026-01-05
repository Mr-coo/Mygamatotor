import { Component } from "./component.js";

export class MovementConstraint extends Component{
    allowX: boolean;
    allowY: boolean;

    constructor(allowX: boolean, allowY: boolean){
        super();
        this.allowX = allowX;
        this.allowY = allowY;
    }
}