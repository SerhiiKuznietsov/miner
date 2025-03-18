import { DrawFunction } from "./type/type";

export class Counter {
  private _currentValue: number = 0;

  constructor(
    private _defaultValue: number = 0,
    private _updateHandler: DrawFunction
  ) {}

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
