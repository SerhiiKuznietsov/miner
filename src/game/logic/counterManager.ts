import { Config } from "../config/game";
import { IInterfaceObject } from "../gameLogic";
import { counterObserver } from "../observable/counter";
import { DataType, tailStateObservable } from "../observable/tailState";
import { StateNamesList } from "../stateControllers/states/type/type";
import { Counter } from "../managers/counter";

export class CounterManager implements IInterfaceObject {
  private _counter: Counter;

  constructor(config: Config) {
    this._counter = new Counter(
      config.minesCount,
      this.updateCounter.bind(this)
    );
    tailStateObservable.attach(this.observerHandler.bind(this));
  }

  private updateCounter(num: number): void {
    counterObserver.notify(num);
  }

  private observerHandler(data: DataType) {
    const { newState, prevState } = data;

    if (newState === StateNamesList.flagState) {
      this._counter.decrement();
      return;
    }

    if (prevState === StateNamesList.flagState) {
      this._counter.increment();
      return;
    }
  }

  public init(): void {
    this._counter.init();
  }

  public restart(): void {
    this._counter.init();
  }

  public start(): void {
    this._counter.init();
  }
}
