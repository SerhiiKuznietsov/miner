import { Config } from "../../config/game";
import { IInterfaceObject } from "../../gameLogic";
import { ClickEvent, clickEventObserver } from "../../observable/clickHandlers";
import { convertSizeToPx } from "./utils/px";
import { CellController } from "./cellController";

// TODO - create MouseEventHandler
// class MouseEventHandler {
//   public onClick() {

//   }

//   public onContextMenu() {}

//   public onMouseUp() {}

//   public onMouseDown() {}
// }

export class Field implements IInterfaceObject {
  private _body: HTMLDivElement = document.querySelector(
    ".miner__body"
  ) as HTMLDivElement;
  private _element: HTMLDivElement = document.querySelector(
    ".miner"
  ) as HTMLDivElement;
  private _config: Config;
  private _cellController: CellController;
  private _handlers: [string, (e: Event) => void][] = [
    [
      "click",
      (e: Event): void => {
        e.preventDefault();
        clickEventObserver.notify([ClickEvent.left, e]);
      },
    ],
    [
      "contextmenu",
      (e: Event): void => {
        e.preventDefault();
        clickEventObserver.notify([ClickEvent.right, e]);
      },
    ],
  ];

  constructor(config: Config) {
    this._config = config;
    this._cellController = new CellController(config);
  }

  private onHandlers() {
    this._handlers.forEach((item) => {
      this._body.addEventListener(item[0], item[1]);
    });
  }

  private offHandlers() {
    this._handlers.forEach((item) => {
      this._body.removeEventListener(item[0], item[1]);
    });
  }

  private createField() {
    this._cellController.init(this._body);
  }

  public init(): void {
    this.resize();
    this.createField();
    this.onHandlers();
  }

  public restart(): void {
    this.clear();
    this.offHandlers(); // TODO - remove after create handlers class
    this.createField();
    this.onHandlers();
  }

  public end(): void {
    this.offHandlers();
  }

  private clear(): void {
    this._body.textContent = "";
  }

  private resize(): void {
    this._element.style.width = convertSizeToPx(
      this._config.rows * this._config.tileSize
    );
  }
}
