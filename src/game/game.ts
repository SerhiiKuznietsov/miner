import { Config } from "./config/game";
import { Vector2 } from "./geometry/vector2";
import { GameEvent, GameEventType, gameObserver } from "./observable/game";
import { TailManager } from "./tail/tail-manager";
import { getAttrsWithEvent } from "./utils/html/click";
import { parseId } from "./utils/id";
import { ActionName, ActionNamesList } from "./actions/actions";
import { Screen } from "./screen/screen";
import { Timer } from "./screen/timer";
import { Field } from "./screen/field";
import { Face } from "./screen/face";

export class Game {
  private _config = new Config();
  private _tailManager = new TailManager(this._config);
  private _screen = new Screen();
  private _isFirstClick: boolean = true;

  constructor() {
    gameObserver.attach(this.observerHandler.bind(this));
  }

  public init(): this {
    this._screen.add(
      new Field(this._config, [
        ["click", this.leftClickHandler.bind(this)],
        ["contextmenu", this.rightClickHandler.bind(this)],
      ])
    );
    this._screen.add(new Timer());
    this._screen.add(new Face());

    this._screen.init();

    return this;
  }

  private observerHandler(data: GameEventType) {
    if (data === GameEvent.start) {
      this.start();
    }
  }

  public start() {
    this._isFirstClick = true;

    this._tailManager.init();
  }

  private win(): void {}

  private lose(): void {}

  private leftClickHandler(e: Event): void {
    this.userClickHandler(e, ActionNamesList.leftClick);
  }

  private rightClickHandler(e: Event): void {
    this.userClickHandler(e, ActionNamesList.rightClick);
  }

  private userClickHandler(e: Event, actionName: ActionName): void {
    e.preventDefault();

    const id = getAttrsWithEvent(e);

    this.checkFirstClick(id);

    this._tailManager.useActionById(id, actionName);
  }

  private checkFirstClick(id: string) {
    if (!this._isFirstClick) return;

    gameObserver.notify(GameEvent.firstClick);

    const [x, y] = parseId(id);

    this._tailManager.init(new Vector2(x, y));
    this._isFirstClick = false;
  }
}
