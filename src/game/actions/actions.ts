import { ActionNames } from "../config/action";

export class Action {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class RightClickAction extends Action {
  constructor() {
    super(ActionNames.rightClick);
  }
}

export class LeftClickAction extends Action {
  constructor() {
    super(ActionNames.leftClick);
  }
}

export class LoseAction extends Action {
  constructor() {
    super(ActionNames.lose);
  }
}

export class WinAction extends Action {
  constructor() {
    super(ActionNames.win);
  }
}

export class CalcAction extends Action {
  constructor() {
    super(ActionNames.calc);
  }
}
