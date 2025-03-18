import { Config } from "../config/game";
import { convertSizeToPx } from "./tile/utils/px";

export class FieldSizeManager {
  private _element: HTMLDivElement = document.querySelector(
    ".miner"
  ) as HTMLDivElement;

  constructor(private _config: Config) {
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
