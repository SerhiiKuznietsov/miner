import { State } from "./states/state";
import { StateList } from "./states/type/type";

export class StateController<S, A> {
  private _state = new Map<S, State<S, A>>();
  private _activeState: S;

  constructor(defaultState: S, stateList: StateList<State<S, A>>) {
    this._activeState = defaultState;
    stateList.forEach((state: State<S, A>) => {
      this._state.set(state.name, state);
    });
  }

  private has(stateName: S): boolean {
    return this._state.has(stateName);
  }

  public change(stateName: S): S {
    if (!this.has(stateName)) {
      throw new Error(`State with name ${stateName} not found`);
    }

    this._activeState = stateName;

    return stateName;
  }

  public getActive(): State<S, A> {
    const activeState = this._state.get(this._activeState);

    if (!activeState) {
      throw new Error(`Active state not found with name: ${this._activeState}`);
    }

    return activeState;
  }
}
