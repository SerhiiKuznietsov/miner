import { Action, LeftClickAction, RightClickAction } from "./actions/actions";
import { Config } from "./config/game";
import { Face } from "./filed/face";
import { Field } from "./filed/field";
import { GameController } from "./game-controller";
import { Vector2 } from "./geometry/vector2";
import { Matrix } from "./matrix/matrix";
import { TailManager } from "./tail/tail-manager";
import { getAttrsWithEvent } from "./utils/event/click";

export class Game {
  private _config = new Config();
  private _face = new Face(this.start.bind(this));
  private _field = new Field(this._config);
  private _tailManager = new TailManager(
    this._config,
    new GameController(this.win.bind(this), this.lose.bind(this))
  );
  private _matrix = new Matrix(this._config);
  private _isFirstClick: boolean = true;

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
    this._face.win();
  }

  private lose(): void {
    this._face.lose();
  }

  private leftClickHandler(e: Event): void {
    this.userClickHandler(e, new LeftClickAction());
  }

  private rightClickHandler(e: Event): void {
    this.userClickHandler(e, new RightClickAction());
  }

  private userClickHandler(e: Event, action: Action): void {
    e.preventDefault();

    const [x, y] = getAttrsWithEvent(e);

    this.checkFirstClick(x, y);

    this._tailManager.useActionById(x, y, action);
  }

  private checkFirstClick(x: number, y: number) {
    if (!this._isFirstClick) return;

    this._matrix.init(this._field, new Vector2(x, y));

    this._tailManager.init(this._matrix.tailSpawner());
    this._isFirstClick = false;
  }
}
