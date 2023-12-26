import { Action } from "../actions/actions";
import { ActionName } from "../actions/type/type";
import { ActionList, StateName } from "./type/type";

export abstract class TailState {
  public readonly name: StateName;
  protected _actions = new Map<ActionName, StateName>();

  constructor(name: StateName, list?: ActionList) {
    this.name = name;
    this.addActionsList(list);
  }

  protected get(actionName: ActionName): StateName {
    const newStateName = this._actions.get(actionName);

    if (!newStateName) {
      throw new Error(
        `State name with action name: ${actionName} is undefined`
      );
    }

    return newStateName;
  }

  public useAction(action: Action): StateName | undefined {
    if (!this._actions.has(action.name)) return;

    return this.get(action.name);
  }

  protected addActionsList(list?: ActionList): void {
    list?.forEach(([actionName, stateName]) => {
      this.addActionItem(actionName, stateName);
    });
  }

  protected addActionItem(actionName: ActionName, stateName: StateName) {
    if (this._actions.has(actionName)) {
      throw new Error(`Not unique action name: ${actionName}`);
    }

    this._actions.set(actionName, stateName);
  }
}
