import { Component } from "./component.js";
export class Input extends Component {
    constructor() {
        super(...arguments);
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }
}
