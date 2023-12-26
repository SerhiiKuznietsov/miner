import { Config } from "../config/game";
import { StateController } from "../controllers/state-controller";
import { Vector2 } from "../geometry/vector2";
import {
  spawnAroundTailState,
  spawnEmptyTailState,
  spawnMineTailState,
} from "../states/spawners";
import { createId } from "../utils/id";
import { useMatrixMineAroundEnricher } from "./enrichers/around";
import { useMatrixMineEnricher } from "./enrichers/mine";
import { MatrixItem } from "./matrix-item";
import { MatrixList, MatrixGenerateContent } from "./type/type";

export class Matrix {
  private _list: MatrixList = new Map();
  private _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  private createTailState(matrixItem: MatrixItem): StateController {
    if (matrixItem.isMine) {
      return spawnMineTailState();
    }

    if (matrixItem.around) {
      return spawnAroundTailState();
    }

    return spawnEmptyTailState();
  }

  public spawn(firsClick?: Vector2): MatrixGenerateContent {
    this.createMatrix(firsClick);

    const result: MatrixGenerateContent = [];

    this._list.forEach((matrixItem) => {
      const state = this.createTailState(matrixItem);

      result.push([matrixItem.id, state, matrixItem.around]);
    });

    return result;
  }

  private clear() {
    this._list.clear();
  }

  private createMatrix(firsClick?: Vector2) {
    this.clear();

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
      const newMatrixItem = new MatrixItem(x, y, id);
      this._list.set(id, newMatrixItem);

      if (firsClick && firsClick.x === x && firsClick.y === y) {
        newMatrixItem.isOpen = true;
      }
    }

    if (!firsClick) return;

    useMatrixMineEnricher(this._config, this.getItem.bind(this));

    useMatrixMineAroundEnricher(
      this._list,
      this._config,
      this.getItem.bind(this)
    );
  }

  private getItem(x: number, y: number): MatrixItem {
    const id = createId(x, y);

    const item = this._list.get(id);

    if (!item) {
      throw new Error(`Matrix item with id: ${id} not found`);
    }

    return item;
  }
}
