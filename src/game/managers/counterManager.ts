import { Config } from "../config/game";
import { counterObserver } from "../observable/counter";
import { DataType, tailStateObservable } from "../observable/tailState";
import { StateNamesList } from "../stateControllers/states/type/type";
import { Counter } from "./counter";
import { ManagerObject } from "./managerController";

export class CounterManager implements ManagerObject {
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
    const [stateName] = data;

    if (stateName === StateNamesList.closeState) {
      this._counter.increment();
      return;
    }

    if (stateName === StateNamesList.flagState) {
      this._counter.decrement();
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

  public stop(): void {}
}
