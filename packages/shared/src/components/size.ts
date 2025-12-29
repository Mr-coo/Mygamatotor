import { Component } from "./component.js";

export class Size extends Component {
  width : number = 10;
  height : number = 10;

   constructor(width: number, height: number){
    super();
    this.width = width;
    this.height = height;
  }
}