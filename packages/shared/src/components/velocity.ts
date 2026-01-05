import { Component } from "./component.js";

export class Velocity  extends Component {
  base: number = 0;
  dx: number = 0;
  dy: number = 0;

  constructor(base: number);
  constructor(base: number, dx : number, dy: number);
  constructor(base: number, dx?: number, dy?: number) {
    super();
    this.base = base;
    this.dx = dx ?? 0; 
    this.dy = dy ?? 0;
  }
}