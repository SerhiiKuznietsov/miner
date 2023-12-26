import { Config } from "./config/game";
import { Vector2 } from "./geometry/vector2";
import { gameObserver } from "./observable/game";
import { TailManager } from "./tail/tail-manager";
import { getAttrsWithEvent } from "./utils/html/click";
import { parseId } from "./utils/id";
import { ActionName, ActionNamesList } from "./actions/actions";
import { Screen } from "./screen/screen";

export class Game {
  private _config = new Config();
  private _tailManager = new TailManager(this._config);
  private _screen = new Screen(
    this._config,
    this.leftClickHandler.bind(this),
    this.rightClickHandler.bind(this)
  );
  private _isFirstClick: boolean = true;

  constructor() {
    gameObserver
      .attach("start", this.start.bind(this))
      .attach("win", this.win.bind(this))
      .attach("lose", this.lose.bind(this));
  }

  public start() {
    this._screen.init();
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

    const [x, y] = parseId(id);

    this._tailManager.init(new Vector2(x, y));
    this._isFirstClick = false;
  }
}
