export class Cell {
  private _element: HTMLDivElement;

  constructor(element: HTMLDivElement) {
    this._element = element;
  }

  public setAttrValue(value: string) {
    this._element.setAttribute("data-img", value);
  }
}
