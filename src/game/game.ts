import { Config } from "./config/game";
import { TailManager } from "./tail/tail-manager";
import { Screen } from "./screen/screen";
import { ScreenTimer } from "./screen/screenTimer";
import { Field } from "./screen/field";
import { Face } from "./screen/face";
import { TimerManager } from "./managers/timerManager";
import { ManagerController } from "./managers/managerController";
// import { GameStateController } from "./controllers/gameStateController";
// import { GameStateList } from "./states/type/type";


// const t = new GameStateController(GameStateList.init)

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
