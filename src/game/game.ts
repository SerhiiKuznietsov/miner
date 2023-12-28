import { Config } from "./config/game";
import { TailManager } from "./tail/tail-manager";
import { Screen } from "./screen/screen";
import { ScreenTimer } from "./screen/screenTimer";
import { Field } from "./screen/field";
import { Face } from "./screen/face";
import { TimerManager } from "./managers/timerManager";
import { ManagerController } from "./managers/managerController";

// export enum GameStateList {
//   init = "init",
//   start = "start",
//   win = "win",
//   lose = "lose",
//   restart = "restart",
// }

// export type GameStateType =
//   | GameStateList.init
//   | GameStateList.start
//   | GameStateList.win
//   | GameStateList.lose
//   | GameStateList.restart;

// export class GameState {
//   private _states = new Map<string, string[]>([
//     [GameStateList.init, [GameStateList.start]],
//     [
//       GameStateList.start,
//       [GameStateList.restart, GameStateList.win, GameStateList.lose],
//     ],
//     [GameStateList.win, [GameStateList.restart]],
//     [GameStateList.lose, [GameStateList.restart]],
//     [GameStateList.restart, [GameStateList.start, GameStateList.restart]],
//   ]);

//   public changeTo(newState: GameStateType): void {

//   }
// }

export class Game {
  private _config = new Config();
  private _screen = new Screen();
  private _managerController = new ManagerController();

  public init(): this {
    // gameObserver.attach(this.observerHandler.bind(this));

    this._screen
      .add(new Field(this._config))
      .add(new ScreenTimer())
      .add(new Face())
      .init();

    this._managerController
      .add(new TimerManager())
      .add(new TailManager(this._config))
      .init();

    return this;
  }

  // private observerHandler(data: GameEventType) {}
}
