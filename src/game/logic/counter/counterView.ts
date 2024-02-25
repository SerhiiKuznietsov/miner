export class CounterView {
  private _element: HTMLSpanElement = document.querySelector(
    ".miner__count span"
  ) as HTMLSpanElement;

  public update(count: number): void {
    this._element.textContent = `${count}`;
  }
}
