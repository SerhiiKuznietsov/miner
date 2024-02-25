import { Config } from "../../config/game";
import { convertSizeToPx } from "./utils/px";
import { TileDataType } from "../../observable/tileState";
import { getAttrValueByState } from "./utils/cellView";
import { MatrixGenerateContent } from "./matrix/type/type";
import { FieldEventHandler } from "./tileEventHandler";
import { createCell } from "./utils/createCell";

export class FieldView {
  private _body: HTMLDivElement = document.querySelector(
    ".miner__body"
  ) as HTMLDivElement;
  private _element: HTMLDivElement = document.querySelector(
    ".miner"
  ) as HTMLDivElement;
  private _config: Config;
  private _clickController: FieldEventHandler;

  constructor(config: Config, clickHandler: (data: Event) => void) {
    this._config = config;
    this._clickController = new FieldEventHandler(this._body, clickHandler);
  }

  private fillCells(matrix: MatrixGenerateContent) {
    this._body.textContent = "";

    matrix.forEach((matrixItem) => {
      const { id, size } = matrixItem;

      const cell = createCell(id, size);

      this._body.append(cell);
    });
  }

  public update(data: TileDataType): void {
    const { newState, id, around } = data;

    const cell = this.getCellById(id);

    const attrValue = getAttrValueByState(newState, around);

    cell.setAttribute("data-img", attrValue);
  }

  private getCellById(id: string): HTMLDivElement {
    const cell = this._body.querySelector(`[data-id="${id}"]`);

    if (!cell) {
      throw new Error(`Cell with ${id} not found`);
    }

    return cell as HTMLDivElement;
  }

  private clear(): void {
    Object.values(this._body.children).forEach((node) => {
      node.removeAttribute("data-img");
    });
  }

  private resize(): void {
    this._element.style.width = convertSizeToPx(
      this._config.rows * this._config.tileSize
    );
  }

  public restart(matrix: MatrixGenerateContent): void {
    this.resize();
    this.clear();
    this._clickController.off();
    this.fillCells(matrix);
    this._clickController.on();
  }

  public end(): void {
    this._clickController.off();
  }
}
