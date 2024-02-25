import { Config } from "./config/game";
import { TailManager } from "./logic/tail/tail-manager";
import { ScreenTimer } from "./logic/timer/timerView";
import { Field } from "./logic/field/fieldView";
import { Face } from "./logic/faceView";
import { TimerManager } from "./logic/timer/timerManager";
import {
  GameAction,
  GameActionNameType,
  GameStateList,
} from "./stateControllers/states/type/type";
import { gameStateObserver } from "./observable/gameState";
import { gameObserver } from "./observable/gameEvent";
import { CounterManager } from "./logic/counter/counterManager";
import { CounterView } from "./logic/counter/counterView";
import { GameLogic } from "./gameLogic";
import { GameStateController } from "./stateControllers/gameStateController";
import { LossManager } from "./logic/lossManager";
import { VictoryManager } from "./logic/victoryManager";

export class Game {
  private _config = new Config();
  private _gameLogic = new GameLogic();
  private _stateController = new GameStateController();

  public init(): this {
    gameObserver.attach((stateName) => {
      if (this._stateController.isActiveState(stateName)) return;

      throw new Error(
        "State change notification bypasses game state change logic"
      );
    });

    gameStateObserver.attach(this.observerHandler.bind(this));

    this._gameLogic
      .add(new VictoryManager(this._config))
      .add(new LossManager())
      .add(new TailManager(this._config))
      .add(new CounterManager(this._config))
      .add(new TimerManager())
      .add(new Field(this._config))
      .add(new ScreenTimer("000"))
      .add(new Face())
      .add(new CounterView(this._config.minesCount))
      .init();

    gameStateObserver.notify(GameAction.toReadyToStart);

    return this;
  }

  private observerHandler(data: GameActionNameType): void {
    const newState = this._stateController.changeByActionThrowable(data);

    gameObserver.notify(newState);


    // TODO - Consider reducing game statuses
    if (newState === GameStateList.restart) {
      gameStateObserver.notify(GameAction.toReadyToStart);
    }

    if (newState === GameStateList.lose || newState === GameStateList.win) {
      gameStateObserver.notify(GameAction.toEnd);
    }
  }
}
