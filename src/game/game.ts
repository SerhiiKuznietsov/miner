import { Config } from "./config/game";
import { TailManager } from "./tail/tail-manager";
import { Screen } from "./screen/screen";
import { ScreenTimer } from "./screen/screenTimer";
import { Field } from "./screen/field";
import { Face } from "./screen/face";
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
      .init();

    this._managerController
      .add(new TimerManager())
      .add(new TailManager(this._config))
      .init();

    gameStateObserver.notify(GameAction.toReadyToStart);

    return this;
  }

  private observerHandler(data: GameActionNameType) {
    console.log(data);
    console.log('active state:', this._stateController.getActive());

    const newState = this._stateController.changeByActionThrowable(data);

    console.log('active state after update:', this._stateController.getActive());

    if (newState === GameStateList.readyToStart) {
      gameObserver.notify(GameStateList.readyToStart);
    }

    if (newState === GameStateList.start) {
      gameObserver.notify(GameStateList.start);
    }

    if (newState === GameStateList.restart) {
      gameObserver.notify(GameStateList.restart);
      gameStateObserver.notify(GameAction.toReadyToStart);
    }

    if (newState === GameStateList.lose) {
      gameObserver.notify(GameStateList.lose);
      gameStateObserver.notify(GameAction.toEnd);
    }

    if (newState === GameStateList.win) {
      gameObserver.notify(GameStateList.win);
      gameStateObserver.notify(GameAction.toEnd);
    }

    if (newState === GameStateList.end) {
      gameObserver.notify(GameStateList.end);
    }

    console.log('active state after if block:', this._stateController.getActive());
  }
}
