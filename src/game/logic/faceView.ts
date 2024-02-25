import { IInterfaceObject } from "../gameLogic";
import { gameStateObserver } from "../observable/gameState";
import { GameAction } from "../stateControllers/states/type/type";

// TODO - put mouse handler code from here
export class Face implements IInterfaceObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__face div"
  ) as HTMLSpanElement;
  private _handler = this.mouseDownHandler.bind(this);

  private mouseDownHandler(): void {
    this.offHandlers();
    this._element.setAttribute("data-img", "face_pressed");
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
    this._element.setAttribute("data-img", "face_win");
  }

  public lose(): void {
    this._element.setAttribute("data-img", "face_lose");
  }

  private setUnpressed(): void {
    this._element.setAttribute("data-img", "face_unpressed");
  }
}
