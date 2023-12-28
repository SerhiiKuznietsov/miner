import { timeObserver } from "../observable/time";
import { ManagerObject } from "./managerController";
import { Timer } from "./timer";

export class TimerManager implements ManagerObject {
  private _timer = new Timer(this.updateTime.bind(this));

  private updateTime(time: string): void {
    timeObserver.notify(time);
  }

  public init(): void {
    this._timer.init();
  }

  public restart(): void {
    this._timer.init();
  }

  public start(): void {
    this._timer.init();
    this._timer.on();
  }

  public stop(): void {
    this._timer.off();
  }
}
