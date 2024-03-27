export class Vector2 {
  private _x: number;
  public get x(): number {
    return this._x;
  }

  private _y: number;
  public get y(): number {
    return this._y;
  }

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public isEqual(vector: Vector2) {
    return vector.x === this._x && vector.y === this._y;
  }
}
