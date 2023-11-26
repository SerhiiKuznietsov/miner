import { Config } from "../config/game";

export class Field {
  private _body: HTMLDivElement = document.querySelector(
    ".miner__body"
  ) as HTMLDivElement;
  private _element: HTMLDivElement = document.querySelector(
    ".miner"
  ) as HTMLDivElement;
  private _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  public init(): void {
    this.clear();
    this.resize();

    for (
      let i = 0, y = -1, x = 0;
      i < this._config.rows * this._config.cols;
      i++, x++
    ) {
      if (i % this._config.cols === 0) {
        x = 0;
        y++;
      }

      this.createCells(x, y, this._config.tileSize);
    }
  }

  public getCell = (x: number, y: number): HTMLDivElement => {
    const cell = this._body.querySelector(
      `.miner__cube[data-y="${y}"][data-x="${x}"]`
    ) as HTMLDivElement;

    if (!cell) {
      throw new Error(`Tile with x: ${x} y: ${y} not found on field`);
    }

    return cell;
  };

  public on(eventName: string, handler: EventListener) {
    this._body.addEventListener(eventName, handler);
  }

  private createCells = (x: number, y: number, size: number) => {
    const tile = document.createElement("div");

    tile.classList.add("miner__cube");
    tile.setAttribute("data-x", String(x));
    tile.setAttribute("data-y", String(y));

    tile.style.width = `${size}px`;
    tile.style.height = `${size}px`;

    this._body.append(tile);
  };

  private clear(): void {
    this._body.textContent = "";
  }

  private resize(): void {
    this._element.style.width = `${
      this._config.rows * this._config.tileSize
    }px`;
  }
}
