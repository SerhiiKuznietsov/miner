import { Config } from "../config/game";
import { CellController } from "./cellController";

export class Field {
  private _body: HTMLDivElement = document.querySelector(
    ".miner__body"
  ) as HTMLDivElement;
  private _element: HTMLDivElement = document.querySelector(
    ".miner"
  ) as HTMLDivElement;
  private _config: Config;
  private _cellController: CellController;

  constructor(config: Config) {
    this._config = config;
    this._cellController = new CellController(config);
  }

  public init(): void {
    this.clear();
    this.resize();
    this._cellController.init(this._body);
  }

  public on(eventName: string, handler: EventListener) {
    this._body.addEventListener(eventName, handler);
  }

  private clear(): void {
    this._body.textContent = "";
  }

  private resize(): void {
    this._element.style.width = `${
      this._config.rows * this._config.tileSize
    }px`;
  }
}
