import { Config } from "../../config/game";
import { IInterfaceObject } from "../../gameLogic";
import { TailDataType, tailStateObservable } from "../../observable/tailState";
import { StateNamesList } from "../../stateControllers/states/type/type";
import { Counter } from "./counter";
import { CounterView } from "./counterView";

export class CounterManager implements IInterfaceObject {
  private _counterView = new CounterView()
  private _counter: Counter;

  constructor(config: Config) {
    this._counter = new Counter(
      config.minesCount,
      this._counterView.update.bind(this._counterView)
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

  public restart(): void {
    this._counter.clear();
  }
}
