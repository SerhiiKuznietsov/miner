import { Config } from "../config/game";
import { convertSizeToPx } from "../utils/px";
import { CellController } from "./cellController";
import { ScreenObject } from "./screen";
// type ClickEventHandler = (e: Event) => void;
export class Field implements ScreenObject {
  private _body: HTMLDivElement = document.querySelector(
    ".miner__body"
  ) as HTMLDivElement;
  private _element: HTMLDivElement = document.querySelector(
    ".miner"
  ) as HTMLDivElement;
  private _config: Config;
  private _cellController: CellController;
  private _handlers: Array<[string, EventListener]>;

  constructor(config: Config, handlers: Array<[string, EventListener]>) {
    this._config = config;
    this._cellController = new CellController(config);
    this._handlers = handlers;
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

  public init(): void {
    this.resize();
    this._cellController.init(this._body);
    this.onHandlers();
  }

  public restart(): void {
    this.clear();
    this.offHandlers();
    this.init();
  }

  public stop(): void {
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
