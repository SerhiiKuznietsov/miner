type DrawFunction = (data: string) => void;
export class Timer {
  private _startTime = Date.now();
  private _loopTimer: any;
  private _drawFunction: DrawFunction;

  constructor(drawFunction: DrawFunction) {
    this._drawFunction = drawFunction;
  }

  private calcTime() {
    const currentTime = Math.floor((Date.now() - this._startTime) / 1000);

    const seconds = currentTime % 60;
    const minutes = Math.floor((currentTime - seconds) / 60);
    const subSecond = seconds < 10 ? "0" : "";

    this._drawFunction(`${minutes}${subSecond}${seconds}`);
  }

  public on() {
    this._loopTimer = setInterval(() => {
      this.calcTime();
    }, 1000);
  }

  public off(): void {
    clearInterval(this._loopTimer);
  }

  public init() {
    this._startTime = Date.now();
    this.calcTime();
  }
}