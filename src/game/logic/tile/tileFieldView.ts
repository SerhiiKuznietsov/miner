import { TileDataType } from "../../services/observable/tileState";
import { getAttrValueByState } from "./utils/cellView";
import { MatrixGenerateContent } from "./matrix/type/type";
import { FieldEventHandler } from "./tileEventHandler";
import { createCell } from "./utils/createCell";
import { getEventData } from "./utils/click";
import { ClickTileHandler } from "./type/type";

export class TileFieldView {
  private _body: HTMLDivElement = document.querySelector(
    ".miner__body"
  ) as HTMLDivElement;
  private _clickController = new FieldEventHandler(
    this._body,
    this.clickEventHandler.bind(this)
  );
  private _clickHandler: ClickTileHandler;

  constructor(clickHandler: ClickTileHandler) {
    this._clickHandler = clickHandler;
  }

  private clickEventHandler(e: Event): void {
    const eventData = getEventData(e);

    this._clickHandler(eventData);
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

  public restart(matrix: MatrixGenerateContent): void {
    this.clear();
    this._clickController.off();
    this.fillCells(matrix);
    this._clickController.on();
  }

  public end(): void {
    this._clickController.off();
  }
}
