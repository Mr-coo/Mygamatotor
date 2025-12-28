import { Component } from "./component.js";
export class Size extends Component {
    constructor() {
        super(...arguments);
        this.width = 10;
        this.height = 10;
    }
}
