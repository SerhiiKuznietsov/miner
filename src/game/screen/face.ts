import { GameEvent, GameEventType, gameObserver } from "../observable/game";
import { ScreenObject } from "./screen";
import { FaceView } from "./view/face";

export class Face implements ScreenObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__face span"
  ) as HTMLSpanElement;

  private observerHandler(data: GameEventType) {
    if (data === GameEvent.win) {
      this.win();
    }

    if (data === GameEvent.lose) {
      this.lose();
    }
  }

  private mouseDownHandler() {
    this.pressed();
    gameObserver.notify(GameEvent.start);
  }

  private mouseUpHandler() {
    this.unpressed();
  }

  private pressed() {
    FaceView.setPressed(this._element);
  }

  public init(): void {
    this._element.addEventListener(
      "mousedown",
      this.mouseDownHandler.bind(this)
    );
    this._element.addEventListener("mouseup", this.mouseUpHandler.bind(this));

    gameObserver.attach(this.observerHandler.bind(this));
    this.unpressed();
  }

  public start(): void {
    this.unpressed();
  }
  public firstClick(): void {}
  public stop(): void {}

  private unpressed(): void {
    FaceView.setUnpressed(this._element);
  }

  private win(): void {
    FaceView.setWin(this._element);
  }

  private lose(): void {
    FaceView.setLose(this._element);
  }
}
