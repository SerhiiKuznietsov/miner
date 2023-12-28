import { Config } from "./config/game";
import { Vector2 } from "./geometry/vector2";
import { GameEvent, GameEventType, gameObserver } from "./observable/game";
import { TailManager } from "./tail/tail-manager";
import { getAttrsWithEvent } from "./utils/html/click";
import { parseId } from "./utils/id";
import { ActionName, ActionNamesList } from "./actions/actions";
import { Screen } from "./screen/screen";
import { ScreenTimer } from "./screen/screenTimer";
import { Field } from "./screen/field";
import { Face } from "./screen/face";
import { TimerManager } from "./managers/timerManager";
import { ManagerController } from "./managers/managerController";

export class Game {
  private _config = new Config();
  private _tailManager = new TailManager(this._config);
  private _screen = new Screen();
  private _managerController = new ManagerController();
  private _isStart: boolean = false;

  public init(): this {
    gameObserver.attach(this.observerHandler.bind(this));

    this._screen
      .add(
        new Field(this._config, [
          ["click", this.leftClickHandler.bind(this)],
          ["contextmenu", this.rightClickHandler.bind(this)],
        ])
      )
      .add(new ScreenTimer())
      .add(new Face())
      .init();

    this._managerController.add(new TimerManager()).init();

    this._tailManager.init();

    return this;
  }

  private observerHandler(data: GameEventType) {
    if (data === GameEvent.restart) {
      this.restart();
    }
  }

  public restart(): void {
    this._isStart = false;
    this._tailManager.init();
  }

  private leftClickHandler(e: Event): void {
    this.userClickHandler(e, ActionNamesList.leftClick);
  }

  private rightClickHandler(e: Event): void {
    this.userClickHandler(e, ActionNamesList.rightClick);
  }

  private userClickHandler(e: Event, actionName: ActionName): void {
    e.preventDefault();

    const id = getAttrsWithEvent(e);

    this.checkStart(id);

    this._tailManager.useActionById(id, actionName);
  }

  private checkStart(id: string) {
    if (this._isStart) return;

    gameObserver.notify(GameEvent.start);

    const [x, y] = parseId(id);

    this._tailManager.start(new Vector2(x, y));
    this._isStart = true;
  }
}
