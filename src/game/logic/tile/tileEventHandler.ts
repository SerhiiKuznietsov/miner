export class FieldEventHandler {
  private _clickHandler: (data: Event) => void;
  private _element: HTMLDivElement;
  private _active = true;
  private _handlers: [string, (e: Event) => void][] = [
    [
      "click",
      (e: Event): void => {
        e.preventDefault();
        if (!this._active) return;
        this._clickHandler(e);
      },
    ],
    [
      "contextmenu",
      (e: Event): void => {
        e.preventDefault();
        if (!this._active) return;
        this._clickHandler(e);
      },
    ],
  ];

  constructor(element: HTMLDivElement, clickHandler: (data: Event) => void) {
    this._element = element;
    this._clickHandler = clickHandler;

    this._handlers.forEach((item) => {
      this._element.addEventListener(item[0], item[1]);
    });
  }

  public on() {
    this._active = true;
  }

  public off() {
    this._active = false;
  }
}
