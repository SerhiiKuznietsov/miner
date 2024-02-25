export class Cell {
  // private _element: HTMLDivElement;
  public readonly element: HTMLDivElement;

  constructor(element: HTMLDivElement) {
    // this._element = element;
    this.element = element;
  }

  public setAttrValue(value: string) {
    this.element.setAttribute("data-img", value);
  }
}
