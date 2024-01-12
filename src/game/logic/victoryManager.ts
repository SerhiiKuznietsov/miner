import { Config } from "../config/game";
import { IInterfaceObject } from "../gameLogic";
import { gameStateObserver } from "../observable/gameState";
import { tailStateObservable, TailDataType } from "../observable/tailState";
import { StateNamesList, GameAction } from "../stateControllers/states/type/type";

export class VictoryManager implements IInterfaceObject {
  private _openField: number = 0;
  private _config: Config

  constructor(config: Config) {
    this._config = config;
  }

  public init() {
    tailStateObservable.attach(this.observerHandler.bind(this));
  }

  public restart(): void {
    this._openField = 0;
  }

  private observerHandler(data: TailDataType): void {
    const { newState } = data;

    if (newState !== StateNamesList.aroundState && newState !== StateNamesList.emptyState) return;

    this._openField++;

    if (this._openField !== this._config.needToOpen) return;

    gameStateObserver.notify(GameAction.toWin);
  }

}