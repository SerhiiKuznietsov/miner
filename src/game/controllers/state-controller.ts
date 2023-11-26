import { TailState } from "../states/state";
import { StateName, StateNamesList } from "../states/type/type";
import { StateList } from "./type/type";

export class StateController {
  private _state = new Map<StateName, TailState>();
  private _activeState: StateName = StateNamesList.closeState;

  constructor(stateList: StateList) {
    stateList.forEach((state) => {
      this._state.set(state.name, state);
    });
  }

  private has(stateName: StateName): boolean {
    return this._state.has(stateName);
  }

  public change(stateName: StateName, element: Element): StateName {
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
