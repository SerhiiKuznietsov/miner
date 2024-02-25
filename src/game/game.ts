import { Config } from "./config/game";
import { TailManager } from "./logic/tail/tail-manager";
import { FieldView } from "./logic/field/fieldView";
import { FaceView } from "./logic/faceView";
import { TimerManager } from "./logic/timer/timerManager";
import {
  GameAction,
  GameActionNameType,
  GameStateList,
} from "./stateControllers/states/type/type";
import { gameStateObserver } from "./observable/gameState";
import { gameObserver } from "./observable/gameEvent";
import { CounterManager } from "./logic/counter/counterManager";
import { GameLogic } from "./gameLogic";
import { GameStateController } from "./stateControllers/gameStateController";
import { LossManager } from "./logic/lossManager";
import { VictoryManager } from "./logic/victoryManager";

export class Game {
  private _config = new Config();
  private _gameLogic = new GameLogic();
  private _stateController = new GameStateController();

  private observerHandler(data: GameActionNameType): void {
    const newState = this._stateController.changeByActionThrowable(data);

    gameObserver.notify(newState);

    if (newState === GameStateList.lose || newState === GameStateList.win) {
      gameStateObserver.notify(GameAction.toEnd);
    }
  }

  public init(): this {
    gameObserver.attach((stateName) => {
      if (this._stateController.isActiveState(stateName)) return;

      throw new Error(
        "State change notification bypasses game state change logic"
      );
    });

    gameStateObserver.attach(this.observerHandler.bind(this));

    this._gameLogic
      .add(new FaceView())
      .add(new FieldView(this._config))
      .add(new VictoryManager(this._config))
      .add(new LossManager())
      .add(new TailManager(this._config))
      .add(new CounterManager(this._config))
      .add(new TimerManager())
      .init();

    return this;
  }
}
