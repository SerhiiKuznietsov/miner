import { ActionName } from "../../actions/actions";
import { TailStateController } from "../../stateControllers/tailStateController/tailStateController";
import { tailStateObservable } from "../../observable/tailState";
import { StateNameType } from "../../stateControllers/states/type/type";

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

  useAction(actionName: ActionName): StateNameType | undefined {
    const prevState = this._stateController.getActive().name

    const newState = this._stateController.changeByAction(actionName);

    if (!newState) return;

    tailStateObservable.notify({ newState, prevState, id: this._id, around: this._around });

    return newState;
  }
}
