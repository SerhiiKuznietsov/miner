import { ActionName } from "../actions/actions";
import { TailStateController } from "../stateControllers/tailStateController";
import { tailStateObservable } from "../observable/tailState";

export class Tail {
  private _stateController: TailStateController;
  private _id: string;
  private _around: number = 0;

  constructor(stateController: TailStateController, id: string, around: number) {
    this._stateController = stateController;
    this._id = id;
    this._around = around;
  }

  useAction(actionName: ActionName): string | undefined {
    const activeState = this._stateController.getActive();

    const newStateName = activeState.useAction(actionName);

    if (!newStateName) return;

    const newState = this._stateController.change(newStateName);
    tailStateObservable.notify([newStateName, this._id, this._around]);

    return newState;
  }
}
