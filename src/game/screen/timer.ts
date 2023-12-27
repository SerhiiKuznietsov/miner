import { GameEvent, GameEventType, gameObserver } from "../observable/game";
// import { FaceView } from "./view/face";

export class Timer {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__timer span"
  ) as HTMLSpanElement;
  private _startTime = Date.now();
  private _outputTime: string = "000";
  private _loopTimer: any;

  constructor() {
    gameObserver.attach(this.observerHandler.bind(this));
  }

  private observerHandler(data: GameEventType) {
    if (data === GameEvent.firstClick) {
      this.start();
    }

    if (data === GameEvent.win || data === GameEvent.lose) {
      this.stop();
    }

    if (data === GameEvent.start) {
      this.clear();
    }
  }

  public init(): void {
    this.drawTime();
  }

  private start() {
    this._startTime = Date.now();
    this._loopTimer = setInterval(() => {
      this.calcTime();
      this.drawTime();
    }, 1000);
  }

  private stop() {
    clearInterval(this._loopTimer);
  }

  private clear() {
    this.stop();
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
