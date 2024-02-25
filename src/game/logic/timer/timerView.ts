export class TimerView {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__timer span"
  ) as HTMLSpanElement;

  public update(time: string): void {
    this._element.textContent = time;
  }
}
