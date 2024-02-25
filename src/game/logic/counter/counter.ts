import { DrawFunction } from "./type/type";

export class Counter {
  private _defaultValue: number;
  private _currentValue: number = 0;
  private _updateHandler: DrawFunction;

  constructor(defaultValue: number = 0, drawFunction: DrawFunction) {
    this._defaultValue = defaultValue;
    this._updateHandler = drawFunction;
  }

  private update(): void {
    this._updateHandler(this._currentValue);
  }

  public increment(): void {
    this._currentValue++;
    this.update();
  }

  public decrement(): void {
    this._currentValue--;

    this.update();
  }

  public clear() {
    this._currentValue = this._defaultValue;
    this.update();
  }
}
