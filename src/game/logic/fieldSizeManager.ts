import { Config } from "../config/game";
import { convertSizeToPx } from "./tile/utils/px";

export class FieldSizeManager {
  private _config: Config;
  private _element: HTMLDivElement = document.querySelector(
    ".miner"
  ) as HTMLDivElement;

  constructor(config: Config) {
    this._config = config;
    this.resize();
  }

  private resize(): void {
    this._element.style.width = convertSizeToPx(
      this._config.rows * this._config.tileSize
    );
  }

  public restart(): void {
    this.resize();
  }
}