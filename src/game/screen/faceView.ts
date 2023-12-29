import { gameObserver } from "../observable/gameEvent";
import { gameStateObserver } from "../observable/gameState";
import {
  GameAction,
  GameStateList,
  GameStateType,
} from "../stateControllers/states/type/type";
import { ScreenObject } from "./screen";
import { FaceView } from "./view/face";

export class Face implements ScreenObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__face span"
  ) as HTMLSpanElement;
  private _handler = this.mouseDownHandler.bind(this);

  private observerHandler(data: GameStateType) {
    if (data === GameStateList.win) {
      FaceView.setWin(this._element);
    }

    if (data === GameStateList.lose) {
      FaceView.setLose(this._element);
    }
  }

  private mouseDownHandler() {
    this.offHandlers();
    this.pressed();
    gameStateObserver.notify(GameAction.toRestart);
    this.onHandlers();
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
    this.onHandlers();
    this._element.addEventListener("mouseup", this.mouseUpHandler.bind(this));

    gameObserver.attach(this.observerHandler.bind(this));
    this.unpressed();
  }

  private onHandlers() {
    this._element.addEventListener("mousedown", this._handler);
  }

  private offHandlers() {
    this._element.removeEventListener("mousedown", this._handler);
  }

  public start(): void {
    this.unpressed();
  }

  private unpressed(): void {
    FaceView.setUnpressed(this._element);
  }
}
