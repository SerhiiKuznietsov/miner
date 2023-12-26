import { Config } from "../config/game";
import { tailStateObservable } from "../observable/tailState";
import { StateName, StateNamesList } from "../states/type/type";
import { createId } from "../utils/id";
import { MineView } from "../view/mine";
import { Cell } from "./cell";
import { createFieldCell } from "./utils/createCell";

export class CellController {
  private _cellsList = new Map<string, Cell>();
  private _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  public init(body: HTMLDivElement) {
    for (
      let i = 0, y = -1, x = 0;
      i < this._config.rows * this._config.cols;
      i++, x++
    ) {
      if (i % this._config.cols === 0) {
        x = 0;
        y++;
      }

      const id = createId(x, y);
      const cell = createFieldCell(x, y, this._config.tileSize);

      this.add(id, new Cell(cell));
      body.append(cell);
    }

    tailStateObservable.attach(
      StateNamesList.aroundState,
      this.changeCellView.bind(this)
    );
    tailStateObservable.attach(
      StateNamesList.closeState,
      this.changeCellView.bind(this)
    );
    tailStateObservable.attach(
      StateNamesList.emptyState,
      this.changeCellView.bind(this)
    );
    tailStateObservable.attach(
      StateNamesList.falseFlagState,
      this.changeCellView.bind(this)
    );
    tailStateObservable.attach(
      StateNamesList.flagState,
      this.changeCellView.bind(this)
    );
    tailStateObservable.attach(
      StateNamesList.mineState,
      this.changeCellView.bind(this)
    );
    tailStateObservable.attach(
      StateNamesList.redMineState,
      this.changeCellView.bind(this)
    );
  }

  private getCellById(id: string): Cell {
    const cell = this._cellsList.get(id);

    if (!cell) {
      throw new Error(`Cell with ${id} not found`);
    }

    return cell;
  }

  private changeCellView([state, id, around]: [StateName, string, number]) {
    const cell = this.getCellById(id);

    console.log(state, id);

    if (state === StateNamesList.aroundState) {
      MineView.setImageType(cell.element, around);
      return;
    }

    if (state === StateNamesList.closeState) {
      MineView.setImageClosed(cell.element);
      return;
    }

    if (state === StateNamesList.emptyState) {
      MineView.setImageType(cell.element);
      return;
    }

    if (state === StateNamesList.falseFlagState) {
      MineView.setImageMineWrong(cell.element);
      return;
    }

    if (state === StateNamesList.flagState) {
      MineView.setImageFlag(cell.element);
      return;
    }

    if (state === StateNamesList.mineState) {
      MineView.setImageMine(cell.element);
      return;
    }

    if (state === StateNamesList.redMineState) {
      MineView.setImageMineRed(cell.element);
      return;
    }
  }

  private add(id: string, cell: Cell) {
    this._cellsList.set(id, cell);
  }
}
