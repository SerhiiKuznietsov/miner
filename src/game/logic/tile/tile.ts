import { TileStateController } from "./tailState/tileStateController/tileStateController";
import {
  TileDataType,
  tileStateObservable,
} from "../../services/observable/tileState";
import { ActionName } from "../../services/stateControllers/type/type";

export class Tile {
  private _stateController: TileStateController;
  private _id: string;
  private _around: number = 0;

  constructor(
    stateController: TileStateController,
    id: string,
    around: number
  ) {
    this._stateController = stateController;
    this._id = id;
    this._around = around;
  }

  public useAction(actionName: ActionName): TileDataType | undefined {
    const prevState = this._stateController.getActiveStateName();

    const newState = this._stateController.changeByAction(actionName);

    if (!newState) return;

    const result = {
      newState,
      prevState,
      id: this._id,
      around: this._around,
    };

    tileStateObservable.notify(result);

    return result;
  }
}
