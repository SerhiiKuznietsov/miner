import { Action } from "../actions/actions";
import { StateController } from "../controllers/state-controller";

export class Tail {
  private _element: Element;
  private _stateController: StateController;

  constructor(element: Element, stateController: StateController) {
    this._element = element;
    this._stateController = stateController;
  }

  useAction(action: Action): string | undefined {
    const activeState = this._stateController.getActive();

    const newStateName = activeState.useAction(action);

    if (!newStateName) return;

    return this._stateController.change(newStateName, this._element);
  }
}
