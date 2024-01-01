import { Config } from "./config/game";
import { TailManager } from "./tail/tail-manager";
import { ScreenTimer } from "./logic/timerView";
import { Field } from "./logic/fieldView";
import { Face } from "./logic/faceView";
import { TimerManager } from "./logic/timerManager";
import { spawnGameStateController } from "./stateControllers/states/spawners/gameStateControllerSpawner";
import {
  GameAction,
  GameActionNameType,
  GameStateList,
} from "./stateControllers/states/type/type";
import { gameStateObserver } from "./observable/gameState";
import { gameObserver } from "./observable/gameEvent";
import { CounterManager } from "./logic/counterManager";
import { CounterView } from "./logic/counterView";
import { Logic } from "./logic";

export class Game {
  private _config = new Config();
  private _gameLogic = new Logic();
  private _stateController = spawnGameStateController();

  public init(): this {
    gameObserver.attach((stateName) => {
      if (stateName === this._stateController.getActive().name) return;

      throw new Error(
        "State change notification bypasses game state change logic"
      );
    });

    gameStateObserver.attach(this.observerHandler.bind(this));

    this._gameLogic
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

  private observerHandler(data: GameActionNameType) {
    const newState = this._stateController.changeByActionThrowable(data);

    gameObserver.notify(newState);

    if (newState === GameStateList.restart) {
      gameStateObserver.notify(GameAction.toReadyToStart);
    }

    if (newState === GameStateList.lose || newState === GameStateList.win) {
      gameStateObserver.notify(GameAction.toEnd);
    }
  }
}
