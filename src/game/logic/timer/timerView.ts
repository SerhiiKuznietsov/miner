import { IInterfaceObject } from "../../gameLogic";
import { timeObserver } from "../../observable/time";

export class ScreenTimer implements IInterfaceObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__timer span"
  ) as HTMLSpanElement;

  constructor(defaultValue: string) {
    this.draw(defaultValue);
  }

  public init(): void {
    timeObserver.attach(this.draw.bind(this));
  }

  private draw(time: string): void {
    this._element.textContent = time;
  }
}
