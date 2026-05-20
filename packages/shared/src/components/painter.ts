import { Component } from "./component.js";

export class Painter extends Component {
  color: string;
  radius: number;

  constructor(color: string, radius: number = 100) {
    super();
    this.color = color;
    this.radius = radius;
  }
}
