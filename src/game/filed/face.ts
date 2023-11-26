import { FaceView } from "../view/face";



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
    FaceView.setPressed(this._element);
  }

  public unpressed(): void {
    FaceView.setUnpressed(this._element);
  }

  public win(): void {
    FaceView.setWin(this._element)
  }

  public lose(): void {
    FaceView.setLose(this._element)
  }
}
