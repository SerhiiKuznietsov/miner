import { ScreenObject } from "./screen";

export class Timer implements ScreenObject {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__timer span"
  ) as HTMLSpanElement;
  private _startTime = Date.now();
  private _outputTime: string = "000";
  private _loopTimer: any;

  public init(): void {
    this.drawTime();
  }

  public start(): void {
    this.clear();
  }

  public firstClick(): void {
    this._startTime = Date.now();
    this._loopTimer = setInterval(() => {
      this.calcTime();
      this.drawTime();
    }, 1000);
  }

  public stop(): void {
    this.stopTimer();
  }

  private stopTimer() {
    clearInterval(this._loopTimer);
  }

  private clear() {
    this.stopTimer();
    this._outputTime = "000";
  }

  private calcTime() {
    const currentTime = Math.floor((Date.now() - this._startTime) / 1000);

    const seconds = currentTime % 60;
    const minutes = Math.floor((currentTime - seconds) / 60);
    const subSecond = seconds < 10 ? "0" : "";

    this._outputTime = `${minutes}${subSecond}${seconds}`;
  }

  private drawTime() {
    this._element.textContent = this._outputTime;
  }
}
