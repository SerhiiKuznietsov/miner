import { timeObserver } from "../observable/time";
import { ScreenObject } from "./screen";

export class ScreenTimer implements ScreenObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__timer span"
  ) as HTMLSpanElement;

  public init(): void {
    timeObserver.attach(this.updateTimer.bind(this));
  }

  private updateTimer(time: string): void {
    this._element.textContent = time;
  }
}
