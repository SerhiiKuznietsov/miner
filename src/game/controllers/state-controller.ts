import { StateNames } from "../config/state";
import { TailState } from "../states/state";
import { StateList } from "./type/type";

export class StateController {
  private _state = new Map<string, TailState>();
  private _activeState: string = StateNames.closeState;

  constructor(stateList: StateList) {
    stateList.forEach((state) => {
      this._state.set(state.name, state);
    });
  }

  private has(stateName: string): boolean {
    return this._state.has(stateName);
  }

  public change(stateName: string, element: Element): string {
    if (!this.has(stateName)) {
      throw new Error(`State with name ${stateName} not found`);
    }

    this._activeState = stateName;

    this.getActive().draw(element);

    return stateName;
  }

  public getActive(): TailState {
    const activeState = this._state.get(this._activeState);

    if (!activeState) {
      throw new Error(`Active state not found with name: ${this._activeState}`);
    }

    return activeState;
  }
}
