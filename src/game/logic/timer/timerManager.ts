import { IInterfaceObject } from "../../gameLogic";
import { Timer } from "./timer";
import { TimerView } from "./timerView";

export class TimerManager implements IInterfaceObject {
  private _timerView = new TimerView();
  private _timer = new Timer(this._timerView.update.bind(this._timerView));

  public start(): void {
    this._timer.init();
    this._timer.on();
  }

  public restart(): void {
    this._timer.off();
    this._timer.init();
  }

  public end(): void {
    this._timer.off();
  }
}
