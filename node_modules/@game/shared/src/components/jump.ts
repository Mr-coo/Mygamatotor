import { Component } from "./component.js";

export class Jump extends Component{
    constructor(public canJump: boolean = true){
        super();
    }
}