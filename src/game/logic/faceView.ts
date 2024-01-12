import { IInterfaceObject } from "../gameLogic";
import { gameStateObserver } from "../observable/gameState";
import { GameAction } from "../stateControllers/states/type/type";
import { FaceView } from "../screen/view/face";


// TODO - put mouse handler code from here
export class Face implements IInterfaceObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__face span"
  ) as HTMLSpanElement;
  private _handler = this.mouseDownHandler.bind(this);

  private mouseDownHandler(): void {
    this.offHandlers();
    FaceView.setPressed(this._element);
    this.onHandlers();
  }

  private mouseUpHandler(): void {
    gameStateObserver.notify(GameAction.toRestart);

    this.setUnpressed();
  }

  public restart(): void {
    this.setUnpressed();
  }

  public init(): void {
    this.onHandlers();
    this._element.addEventListener("mouseup", this.mouseUpHandler.bind(this));
    this.setUnpressed();
  }

  private onHandlers() {
    this._element.addEventListener("mousedown", this._handler);
  }

  private offHandlers() {
    this._element.removeEventListener("mousedown", this._handler);
  }

  public start(): void {
    this.setUnpressed();
  }

  public win(): void {
    FaceView.setWin(this._element);
  }

  public lose(): void {
    FaceView.setLose(this._element);
  }

  private setUnpressed(): void {
    FaceView.setUnpressed(this._element);
  }
}
