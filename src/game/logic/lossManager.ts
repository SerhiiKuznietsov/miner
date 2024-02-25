import { IInterfaceObject } from "../gameLogic";
import { gameStateObserver } from "../services/observable/gameState";
import { tileStateObservable, TileDataType } from "../services/observable/tileState";
import {
  StateNamesList,
  GameAction,
} from "../services/stateControllers/states/type/type";

export class LossManager implements IInterfaceObject {
  constructor() {
    tileStateObservable.attach(this.observerHandler.bind(this));
  }

  private observerHandler(data: TileDataType): void {
    const { newState } = data;

    if (newState !== StateNamesList.redMineState) return;

    gameStateObserver.notify(GameAction.toLose);
  }

  restart() {

  }
}
