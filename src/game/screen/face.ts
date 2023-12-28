import { GameEvent, GameEventType, gameObserver } from "../observable/gameEvent";
import { ScreenObject } from "./screen";
import { FaceView } from "./view/face";

export class Face implements ScreenObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__face span"
  ) as HTMLSpanElement;

  private observerHandler(data: GameEventType) {
    if (data === GameEvent.win) {
      FaceView.setWin(this._element);
    }

    if (data === GameEvent.lose) {
      FaceView.setLose(this._element);
    }
  }

  private mouseDownHandler() {
    this.pressed();
    gameObserver.notify(GameEvent.restart);
  }

  private mouseUpHandler() {
    this.unpressed();
  }

  private pressed() {
    FaceView.setPressed(this._element);
  }

  public restart(): void {
    this.unpressed();
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

  private unpressed(): void {
    FaceView.setUnpressed(this._element);
  }
}
