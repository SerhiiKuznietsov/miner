import { Action, LeftClickAction, RightClickAction } from "./actions/actions";
import { Config } from "./config/game";
import { Face } from "./filed/face";
import { Field } from "./filed/field";
import { Vector2 } from "./geometry/vector2";
import { Matrix } from "./matrix/matrix";
import { gameObserver } from "./observable/game";
import { TailManager } from "./tail/tail-manager";
import { getAttrsWithEvent } from "./utils/html/click";
import { parseId } from "./utils/id";



// export class Screen {
//   private _field = new Field(this._config);
//   private _face = new Face();

// }


export class Game {
  private _config = new Config();
  private _face = new Face();
  private _field = new Field(this._config);
  private _tailManager = new TailManager(this._config);
  private _matrix = new Matrix(this._config);
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

    this._matrix.init(this._field);
    this._tailManager.init(this._matrix.tailSpawner());
  }

  private win(): void {

  }

  private lose(): void {

  }

  private leftClickHandler(e: Event): void {
    this.userClickHandler(e, new LeftClickAction());
  }

  private rightClickHandler(e: Event): void {
    this.userClickHandler(e, new RightClickAction());
  }

  private userClickHandler(e: Event, action: Action): void {
    e.preventDefault();

    const id = getAttrsWithEvent(e);

    this.checkFirstClick(id);

    this._tailManager.useActionById(id, action);
  }

  private checkFirstClick(id: string) {
    if (!this._isFirstClick) return;

    const [x, y] = parseId(id);

    this._matrix.init(this._field, new Vector2(x, y));

    this._tailManager.init(this._matrix.tailSpawner());
    this._isFirstClick = false;
  }
}
