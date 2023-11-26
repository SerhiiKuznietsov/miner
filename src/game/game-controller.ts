export class GameController {
  private _win: Function;
  private _lose: Function;

  constructor(winSignal: Function, loseSignal: Function) {
    this._win = winSignal;
    this._lose = loseSignal;
  }

  public useWin(): void {
    this._win();
  }

  public useLose(): void {
    this._lose();
  }
}