import { Component } from "./component.js";

export class Position extends Component{
  x: number = 0;
  y: number = 0;

  constructor(x : number, y : number){
    super();
    this.x = x;
    this.y = y;
  }
}