import { Component } from "./component.js";
export class Jump extends Component {
    constructor(canJump = true) {
        super();
        this.canJump = canJump;
    }
}
