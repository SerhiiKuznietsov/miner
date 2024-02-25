import { Config } from "../config/game";
import { IInterfaceObject } from "../gameLogic";
import { gameStateObserver } from "../services/observable/gameState";
import { tileStateObservable, TileDataType } from "../services/observable/tileState";
import {
  StateNamesList,
  GameAction,
} from "../services/stateControllers/type/type";

export class VictoryManager implements IInterfaceObject {
  private _openField: number = 0;
  private _config: Config;

  constructor(config: Config) {
    this._config = config;

    tileStateObservable.attach(this.observerHandler.bind(this));
  }

  private observerHandler(data: TileDataType): void {
    const { newState } = data;

    if (
      newState !== StateNamesList.aroundState &&
      newState !== StateNamesList.emptyState
    )
      return;

    this._openField++;

    if (this._openField !== this._config.needToOpen) return;

    gameStateObserver.notify(GameAction.toWin);
  }

  public restart(): void {
    this._openField = 0;
  }
}
