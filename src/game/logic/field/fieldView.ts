import { Config } from "../../config/game";
import { ClickEvent, ClickEventObserverDataType } from "../tail/type/type";
import { convertSizeToPx } from "./utils/px";
import { TailDataType, tailStateObservable } from "../../observable/tailState";
import { Cell } from "./cell";
import { getAttrValueByState } from "./utils/cellView";
import { createFieldCell } from "./utils/createCell";
import { MatrixGenerateContent } from "../tail/matrix/type/type";

class FieldMouseEventHandler {
  private _clickHandler: (data: ClickEventObserverDataType) => void;
  private _element: HTMLDivElement;
  private _handlers: [string, (e: Event) => void][] = [
    [
      "click",
      (e: Event): void => {
        e.preventDefault();
        this._clickHandler([ClickEvent.left, e]);
      },
    ],
    [
      "contextmenu",
      (e: Event): void => {
        e.preventDefault();
        this._clickHandler([ClickEvent.right, e]);
      },
    ],
  ];

  constructor(
    element: HTMLDivElement,
    clickHandler: (data: ClickEventObserverDataType) => void
  ) {
    this._element = element;
    this._clickHandler = clickHandler;
  }

  public on() {
    this.off();
    this._handlers.forEach((item) => {
      this._element.addEventListener(item[0], item[1]);
    });
  }

  public off() {
    this._handlers.forEach((item) => {
      this._element.removeEventListener(item[0], item[1]);
    });
  }
}

export class FieldView {
  private _body: HTMLDivElement = document.querySelector(
    ".miner__body"
  ) as HTMLDivElement;
  private _element: HTMLDivElement = document.querySelector(
    ".miner"
  ) as HTMLDivElement;
  private _config: Config;
  private _clickController: FieldMouseEventHandler;
  private _cellsList = new Map<string, Cell>();

  constructor(
    config: Config,
    clickHandler: (data: ClickEventObserverDataType) => void
  ) {
    this._config = config;
    this._clickController = new FieldMouseEventHandler(
      this._body,
      clickHandler
    );

    tailStateObservable.attach(this.observerHandler.bind(this));
  }

  private fillCells(matrix: MatrixGenerateContent) {
    matrix.forEach((matrixItem) => {
      const { id, position, size } = matrixItem;
      const cell = createFieldCell(position.x, position.y, size);

      this._cellsList.set(id, new Cell(cell));
      this._body.append(cell);
    });
  }

  private observerHandler(data: TailDataType) {
    const { newState, id, around } = data;

    const cell = this.getCellById(id);

    const attrValue = getAttrValueByState(newState, around);

    cell.setAttrValue(attrValue);
  }

  private getCellById(id: string): Cell {
    const cell = this._cellsList.get(id);

    if (!cell) {
      throw new Error(`Cell with ${id} not found`);
    }

    return cell;
  }

  private clear(): void {
    this._body.textContent = "";
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
