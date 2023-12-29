import { timeObserver } from "../observable/time";
import { ScreenObject } from "./screen";

export class ScreenTimer implements ScreenObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__timer span"
  ) as HTMLSpanElement;

  public init(): void {
    timeObserver.attach(this.draw.bind(this));
  }

  private draw(time: string): void {
    this._element.textContent = time;
  }
}
