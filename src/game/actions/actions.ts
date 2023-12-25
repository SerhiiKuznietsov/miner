import { ActionName, ActionNamesList } from "./type/type";

export class Action {
  readonly name: ActionName;

  constructor(name: ActionName) {
    this.name = name;
  }
}

export class RightClickAction extends Action {
  constructor() {
    super(ActionNamesList.rightClick);
  }
}

export class LeftClickAction extends Action {
  constructor() {
    super(ActionNamesList.leftClick);
  }
}

export class LoseAction extends Action {
  constructor() {
    super(ActionNamesList.lose);
  }
}

export class WinAction extends Action {
  constructor() {
    super(ActionNamesList.win);
  }
}

export class CalcAction extends Action {
  constructor() {
    super(ActionNamesList.calc);
  }
}
