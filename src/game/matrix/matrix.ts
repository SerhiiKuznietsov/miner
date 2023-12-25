import { Config } from "../config/game";
import { StateController } from "../controllers/state-controller";
import { Field } from "../filed/field";
import { Vector2 } from "../geometry/vector2";
import {
  MineTailStateSpawner,
  SpawnerAroundTailState,
  EmptyTailStateSpawner,
} from "../spawners";
import { createId } from "../utils/id";
import { MatrixMineAroundEnricher } from "./enrichers/around";
import { MatrixMineEnricher } from "./enrichers/mine";
import { MatrixItem } from "./matrix-item";
import { MatrixList, MatrixGenerateContent } from "./type/type";

export class Matrix {
  private _list: MatrixList = new Map();
  private _config: Config;
  private _matrixMineEnricher = new MatrixMineEnricher();
  private _matrixMineAroundEnricher = new MatrixMineAroundEnricher();

  constructor(config: Config) {
    this._config = config;
  }

  private createTailState(matrixItem: MatrixItem): StateController {
    let spawner = new EmptyTailStateSpawner();

    if (matrixItem.isMine) {
      spawner = new MineTailStateSpawner();
    }

    if (matrixItem.around) {
      spawner = new SpawnerAroundTailState(matrixItem.around);
    }

    return spawner.spawn();
  }

  public tailSpawner(): MatrixGenerateContent {
    const result: MatrixGenerateContent = [];

    this._list.forEach((matrixItem) => {
      const state = this.createTailState(matrixItem);

      result.push([matrixItem.id, matrixItem.element, state]);
    });

    return result;
  }

  public init(field: Field, firsClick?: Vector2) {
    this._list.clear();

    for (
      let i = 0, y = -1, x = 0;
      i < this._config.rows * this._config.cols;
      i++, x++
    ) {
      if (i % this._config.cols === 0) {
        x = 0;
        y++;
      }

      const cell = field.getCell(x, y);
      const id = createId(x, y);
      const newMatrixItem = new MatrixItem(x, y, id, cell);
      this._list.set(id, newMatrixItem);

      if (firsClick && firsClick.x === x && firsClick.y === y) {
        newMatrixItem.isOpen = true;
      }
    }

    if (!firsClick) return;

    this._matrixMineEnricher.enrich(this._config, this.getItem.bind(this));

    this._matrixMineAroundEnricher.enrich(
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
