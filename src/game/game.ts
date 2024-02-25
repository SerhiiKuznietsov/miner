import { Config } from "./config/game";
import { TileManager } from "./logic/tile/tileManager";
import { FaceView } from "./logic/faceView";
import { TimerManager } from "./logic/timer/timerManager";
import {
  GameAction,
  GameActionNameType,
  GameStateList,
} from "./services/stateControllers/type/type";
import { gameStateObserver } from "./services/observable/gameState";
import { gameObserver } from "./services/observable/gameEvent";
import { CounterManager } from "./logic/counter/counterManager";
import { GameLogic } from "./gameLogic";
import { GameStateController } from "./services/gameState/gameStateController";
import { LossManager } from "./logic/lossManager";
import { VictoryManager } from "./logic/victoryManager";
import { FieldSizeManager } from "./logic/fieldSizeManager";

export class Game {
  private _config = new Config();
  private _gameLogic = new GameLogic();
  private _stateController = new GameStateController();

  constructor() {
    gameStateObserver.attach(this.observerHandler.bind(this));
  }

  private observerHandler(data: GameActionNameType): void {
    const newState = this._stateController.changeByActionThrowable(data);

    gameObserver.notify(newState);

    if (newState === GameStateList.lose || newState === GameStateList.win) {
      gameStateObserver.notify(GameAction.toEnd);
    }
  }

  public init(): void {
    this._gameLogic
      .add(new FieldSizeManager(this._config))
      .add(new FaceView())
      .add(new VictoryManager(this._config))
      .add(new LossManager())
      .add(new TileManager(this._config))
      .add(new CounterManager(this._config))
      .add(new TimerManager())
      .init();
  }
}
