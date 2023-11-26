export class Face {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__face span"
  ) as HTMLSpanElement;
  private _gameStarter: Function;

  constructor(gameStarter: Function) {
    this._gameStarter = gameStarter;

    this._element.addEventListener(
      "mousedown",
      this.mouseDownHandler.bind(this)
    );
    this._element.addEventListener("mouseup", this.mouseUpHandler.bind(this));
  }

  private mouseDownHandler() {
    this.pressed();
    this._gameStarter();
  }

  private mouseUpHandler() {
    this.unpressed();
  }

  public init(): void {
    this.unpressed();
  }

  private pressed() {
    this._element.style.backgroundImage = "url(./src/img/face_pressed.svg)";
  }

  public unpressed(): void {
    this._element.style.backgroundImage = "url(./src/img/face_unpressed.svg)";
  }

  public win(): void {
    this._element.style.backgroundImage = "url(./src/img/face_win.svg)";
  }

  public lose(): void {
    this._element.style.backgroundImage = `url(./src/img/face_lose.svg)`;
  }
}
