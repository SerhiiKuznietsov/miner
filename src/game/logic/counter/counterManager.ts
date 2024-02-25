import { Config } from "../../config/game";
import { IInterfaceObject } from "../../gameLogic";
import { counterObserver } from "../../observable/counter";
import { TailDataType, tailStateObservable } from "../../observable/tailState";
import { StateNamesList } from "../../stateControllers/states/type/type";
import { Counter } from "./counter";

export class CounterManager implements IInterfaceObject {
  private _counter: Counter;

  constructor(config: Config) {
    this._counter = new Counter(
      config.minesCount,
      counterObserver.notify.bind(counterObserver)
    );
    tailStateObservable.attach(this.observerHandler.bind(this));
  }

  private observerHandler(data: TailDataType) {
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
    this._counter.clear();
  }

  public start(): void {
    this._counter.clear();
  }

  public restart(): void {
    this._counter.clear();
  }
}
