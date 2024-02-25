import { IInterfaceObject } from "../../gameLogic";
import { counterObserver } from "../../observable/counter";

export class CounterView implements IInterfaceObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__count span"
  ) as HTMLSpanElement;

  constructor(defaultCount: number) {
    this.draw(defaultCount);
  }

  private draw(count: number): void {
    this._element.textContent = `${count}`;
  }

  public init(): void {
    counterObserver.attach(this.draw.bind(this));
  }
}
