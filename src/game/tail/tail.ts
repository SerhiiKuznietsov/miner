import { ActionName } from "../actions/actions";
import { TailStateController } from "../stateControllers/tailStateController/tailStateController";
import { tailStateObservable } from "../observable/tailState";

export class Tail {
  private _stateController: TailStateController;
  private _id: string;
  private _around: number = 0;

  constructor(
    stateController: TailStateController,
    id: string,
    around: number
  ) {
    this._stateController = stateController;
    this._id = id;
    this._around = around;
  }

  useAction(actionName: ActionName): string | undefined {
    const newState = this._stateController.changeByAction(actionName);

    if (!newState) return;

    tailStateObservable.notify([newState, this._id, this._around]);

    return newState;
  }
}
