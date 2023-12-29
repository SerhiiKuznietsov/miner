import { counterObserver } from "../observable/counter";
import { ScreenObject } from "./screen";

export class CounterView implements ScreenObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__count span"
  ) as HTMLSpanElement;

  public init(): void {
    counterObserver.attach(this.updateTimer.bind(this));
  }

  private updateTimer(count: number): void {
    this._element.textContent = `${count}`;
  }
}
