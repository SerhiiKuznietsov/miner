import { Config } from "./config/game";
import { TailManager } from "./tail/tail-manager";
import { ScreenTimer } from "./screen/timerView";
import { Field } from "./screen/fieldView";
import { Face } from "./screen/faceView";
import { TimerManager } from "./managers/timerManager";
import { spawnGameStateController } from "./stateControllers/states/spawners/gameStateControllerSpawner";
import {
  GameAction,
  GameActionNameType,
  GameStateList,
} from "./stateControllers/states/type/type";
import { gameStateObserver } from "./observable/gameState";
import { gameObserver } from "./observable/gameEvent";
import { CounterManager } from "./managers/counterManager";
import { CounterView } from "./screen/counterView";
import { GameInterface } from "./gameInterface";

export class Game {
  private _config = new Config();
  private _gameInterface = new GameInterface();
  private _stateController = spawnGameStateController();

  public init(): this {
    gameObserver.attach((stateName) => {
      if (stateName == this._stateController.getActive().name) return;

      throw new Error(
        "State change notification bypasses game state change logic"
      );
    });

    gameStateObserver.attach(this.observerHandler.bind(this));

    this._gameInterface
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
