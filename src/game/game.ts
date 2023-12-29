import { Config } from "./config/game";
import { TailManager } from "./tail/tail-manager";
import { Screen } from "./screen/screen";
import { ScreenTimer } from "./screen/screenTimer";
import { Field } from "./screen/fieldView";
import { Face } from "./screen/faceView";
import { TimerManager } from "./managers/timerManager";
import { ManagerController } from "./managers/managerController";
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

export class Game {
  private _config = new Config();
  private _screen = new Screen();
  private _managerController = new ManagerController();
  private _stateController = spawnGameStateController();

  public init(): this {
    gameStateObserver.attach(this.observerHandler.bind(this));

    this._screen
      .add(new Field(this._config))
      .add(new ScreenTimer())
      .add(new Face())
      .add(new CounterView())
      .init();

    this._managerController
      .add(new TailManager(this._config))
      .add(new CounterManager(this._config))
      .add(new TimerManager())
      .init();

    gameStateObserver.notify(GameAction.toReadyToStart);

    return this;
  }

  private observerHandler(data: GameActionNameType) {
    console.log(data);
    console.log("active state:", this._stateController.getActive());

    const newState = this._stateController.changeByActionThrowable(data);

    console.log(
      "active state after update:",
      this._stateController.getActive()
    );

    gameObserver.notify(newState);

    console.log(
      "active state after notify:",
      this._stateController.getActive()
    );

    if (newState === GameStateList.restart) {
      gameStateObserver.notify(GameAction.toReadyToStart);
    }

    if (newState === GameStateList.lose || newState === GameStateList.win) {
      gameStateObserver.notify(GameAction.toEnd);
    }


  }
}
