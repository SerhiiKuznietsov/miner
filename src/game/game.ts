import { LeftClickAction, RightClickAction } from "./actions/actions";
import { Config } from "./config/game";
import { Face } from "./filed/face";
import { Field } from "./filed/field";
import { GameController } from "./game-controller";
import { Vector2 } from "./geometry/vector2";
import { Matrix } from "./matrix/matrix";
import { TailManager } from "./tail/tail-manager";

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
    this._field.on("click", this.userClickHandler.bind(this));
    this._field.on("contextmenu", this.userClickHandler.bind(this));

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

  private userClickHandler(e: Event): void {
    e.preventDefault();

    const { dataset }: HTMLElement = <HTMLElement>e.target;

    if (!dataset.x || !dataset.y) {
      throw new Error("Element dataset is empty");
    }

    const x: number = +dataset.x;
    const y: number = +dataset.y;

    if (this._isFirstClick) {
      this._matrix.init(this._field, new Vector2(x, y));

      this._tailManager.init(this._matrix.tailSpawner());
      this._isFirstClick = false;
    }

    const action =
      e.type === "click" ? new LeftClickAction() : new RightClickAction();

    this._tailManager.useActionById(x, y, action);
  }
}