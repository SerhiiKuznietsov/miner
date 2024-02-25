import { IInterfaceObject } from "../gameLogic";
import { gameStateObserver } from "../observable/gameState";
import { tailStateObservable, TailDataType } from "../observable/tailState";
import {
  StateNamesList,
  GameAction,
} from "../stateControllers/states/type/type";

export class LossManager implements IInterfaceObject {
  public init() {
    tailStateObservable.attach(this.observerHandler.bind(this));
  }

  private observerHandler(data: TailDataType): void {
    const { newState } = data;

    if (newState !== StateNamesList.redMineState) return;

    gameStateObserver.notify(GameAction.toLose);
  }
}
