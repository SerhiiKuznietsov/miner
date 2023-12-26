import { Config } from "./config/game";
import { Face } from "./screen/face";
import { Field } from "./screen/field";
import { Vector2 } from "./geometry/vector2";
import { gameObserver } from "./observable/game";
import { TailManager } from "./tail/tail-manager";
import { getAttrsWithEvent } from "./utils/html/click";
import { parseId } from "./utils/id";
import { ActionName, ActionNamesList } from "./actions/actions";

export class Game {
  private _config = new Config();
  private _face = new Face();
  private _field = new Field(this._config);
  private _tailManager = new TailManager(this._config);
  private _isFirstClick: boolean = true;

  constructor() {
    gameObserver
      .attach("start", this.start.bind(this))
      .attach("win", this.win.bind(this))
      .attach("lose", this.lose.bind(this));
  }

  public start() {
    this._field.init();
    this._field.on("click", this.leftClickHandler.bind(this));
    this._field.on("contextmenu", this.rightClickHandler.bind(this));

    this._face.init();
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
