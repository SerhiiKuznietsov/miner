import { DrawFunction } from "./type/type";

export class Counter {
  private _defaultValue: number;
  private _currentValue: number = 0;
  private _drawFunction: DrawFunction;

  constructor(defaultValue: number = 0, drawFunction: DrawFunction) {
    this._defaultValue = defaultValue;
    this._drawFunction = drawFunction;
  }

  private draw(): void {
    this._drawFunction(this._currentValue);
  }

  public init(): void {
    this._currentValue = this._defaultValue;
    this.draw();
  }

  public increment(): void {
    this._currentValue++;
    this.draw();
  }

  public decrement(): void {
    this._currentValue--;

    this.draw();
  }
}
