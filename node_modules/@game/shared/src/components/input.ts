import { Component } from "./component.js";

export class Input extends Component{
  up: boolean = false;
  down: boolean = false;
  left: boolean = false;
  right: boolean = false;
  jumpPressed?: boolean;
  attackPressed?: boolean;
}