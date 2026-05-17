import { Component } from "./component.js";

export class Duration extends Component {
    constructor(public total: number = 60, public remaining: number = total) {
        super();
    }
}
