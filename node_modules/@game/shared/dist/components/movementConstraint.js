import { Component } from "./component.js";
export class MovementConstraint extends Component {
    constructor(allowX, allowY) {
        super();
        this.allowX = allowX;
        this.allowY = allowY;
    }
}
