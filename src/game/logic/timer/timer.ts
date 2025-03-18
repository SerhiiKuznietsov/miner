type DrawFunction = (data: string) => void;
export class Timer {
  private _startTime = Date.now();
  private _loopTimer: any;

  constructor(private _updateHandler: DrawFunction) {}

  private calcTime() {
    const currentTime = Math.floor((Date.now() - this._startTime) / 1000);

    const seconds = currentTime % 60;
    const minutes = Math.floor((currentTime - seconds) / 60);
    const subSecond = seconds < 10 ? "0" : "";

    this._updateHandler(`${minutes}${subSecond}${seconds}`);
  }

  public init() {
    this._startTime = Date.now();
    this.calcTime();
  }

  public on() {
    this._loopTimer = setInterval(() => {
      this.calcTime();
    }, 1000);
  }

  public off(): void {
    clearInterval(this._loopTimer);
  }
}
