import { ActionName, ActionNamesList } from "../../actions/actions";
import { Config } from "../../config/game";
import { Vector2 } from "../../geometry/vector2";
import { spawnTileMatrix } from "./matrix/matrix";
import {
  GameAction,
  StateNamesList,
} from "../../stateControllers/states/type/type";
import { createId, parseId } from "../../utils/id";
import { Tile } from "./tile";
import { getAttrsWithEvent } from "./utils/click";
import { gameStateObserver } from "../../observable/gameState";
import { FieldView } from "./tileFieldView";
import { MatrixGenerateContent } from "./matrix/type/type";

export class TileManager {
  private _tiles = new Map<string, Tile>();
  private _config: Config;
  private _firstClick: Vector2 | undefined;
  private _calculatedTiles = new Set<string>();
  private _view: FieldView;

  constructor(config: Config) {
    this._config = config;
    this._view = new FieldView(this._config, this.clickHandler.bind(this));
  }

  private get(id: string): Tile {
    const tile = this._tiles.get(id);

    if (!tile) {
      throw new Error(`Tile with id: ${id} not found`);
    }

    return tile;
  }

  private clickHandler(e: Event): void {
    const id = getAttrsWithEvent(e);

    if (!this._firstClick) {
      const [x, y] = parseId(id);

      this._firstClick = new Vector2(x, y);

      gameStateObserver.notify(GameAction.toStart);
    }

    const actionName: ActionName =
      e.type === "click"
        ? ActionNamesList.leftClick
        : ActionNamesList.rightClick;

    this.useActionById(id, actionName);
  }

  private clear(): void {
    this._tiles.clear();
    this._calculatedTiles.clear();
    this._firstClick = undefined;
  }

  private createTiles(): MatrixGenerateContent {
    const tileMatrix = spawnTileMatrix(this._config, this._firstClick);

    tileMatrix.forEach((tileMatrixItem) => {
      const { id, state, around } = tileMatrixItem;

      this._tiles.set(id, new Tile(state, id, around));
    });

    return tileMatrix;
  }

  private openAround(id: string): void {
    const [x, y] = parseId(id);

    for (let i = 0; i < this._config.minesCheckArr.length; i++) {
      const xAround = x + this._config.minesCheckArr[i][1];
      const yAround = y + this._config.minesCheckArr[i][0];

      if (
        yAround > -1 &&
        yAround < this._config.rows &&
        xAround > -1 &&
        xAround < this._config.cols
      ) {
        const newId = createId(xAround, yAround);

        this.useActionById(newId, ActionNamesList.calc);
      }
    }
  }

  public start(): void {
    this.createTiles();
  }

  public restart(): void {
    this.clear();
    const matrix = this.createTiles();
    this._view.restart(matrix);
  }

  public end(): void {
    this._view.end();
  }

  public useActionById(id: string, actionName: ActionName): void {
    if (actionName === ActionNamesList.calc) {
      if (!this._calculatedTiles.has(id)) {
        this._calculatedTiles.add(id);
      } else {
        return;
      }
    }

    const stateData = this.get(id).useAction(actionName);

    if (!stateData) return;

    this._view.update(stateData);

    if (stateData.newState !== StateNamesList.emptyState) return;

    this.openAround(id);
  }
}
