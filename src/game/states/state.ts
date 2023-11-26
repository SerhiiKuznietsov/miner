import { Action } from "../actions/actions";

export type ActionList = Array<[string, string]>;

export abstract class TailState {
  public readonly name: string;
  protected _actions = new Map<string, string>();

  constructor(name: string, list?: ActionList) {
    this.name = name;
    list?.forEach(([actionName, stateName]) => {
      this.addAction(actionName, stateName);
    });
  }

  public abstract draw(element: any): void;

  public useAction(action: Action): string | undefined {
    if (!this._actions.has(action.name)) return;

    const newStateName = this._actions.get(action.name);

    if (!newStateName) {
      throw new Error(
        `State name with action name: ${action.name} is undefined`
      );
    }

    return newStateName;
  }

  private addAction(actionName: string, stateName: string): TailState {
    if (this._actions.has(actionName)) {
      throw new Error(`Not unique action name: ${actionName}`);
    }

    this._actions.set(actionName, stateName);

    return this;
  }
}
