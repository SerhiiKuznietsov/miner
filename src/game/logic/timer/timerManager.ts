import { IInterfaceObject } from "../../gameLogic";
import { timeObserver } from "../../observable/time";
import { Timer } from "./timer";

export class TimerManager implements IInterfaceObject {
  private _timer = new Timer(timeObserver.notify.bind(timeObserver));

  public init(): void {
    this._timer.init();
  }

  public start(): void {
    this._timer.init();
    this._timer.on();
  }

  public restart(): void {
    this._timer.init();
  }

  public end(): void {
    this._timer.off();
  }
}
