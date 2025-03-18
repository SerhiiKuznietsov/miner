import { Config } from "../../config/game";
import { Vector2 } from "../../utils/vector2";
import { spawnTileMatrix } from "./matrix/matrix";
import {
  ActionName,
  ActionNamesList,
  GameAction,
  StateNamesList,
} from "../../services/stateControllers/type/type";
import { createId, parseId } from "../../utils/id";
import { Tile } from "./tile";
import { gameStateObserver } from "../../services/observable/gameState";
import { TileFieldView } from "./tileFieldView";
import { MatrixGenerateContent } from "./matrix/type/type";
import { ClickTileData, FirstClickType } from "./type/type";

export class TileManager {
  private _tiles = new Map<string, Tile>();
  private _firstClick: FirstClickType;
  private _calculatedTiles = new Set<string>();
  private _view = new TileFieldView(this.updateTile.bind(this));

  constructor(private _config: Config) {}

  private get(id: string): Tile {
    const tile = this._tiles.get(id);

    if (!tile) {
      throw new Error(`Tile with id: ${id} not found`);
    }

    return tile;
  }

  private updateTile(data: ClickTileData): void {
    const { id, eventType } = data;

    if (!this._firstClick) {
      const [x, y] = parseId(id);

      this._firstClick = new Vector2(x, y);

      gameStateObserver.notify(GameAction.toStart);
    }

    const actionName: ActionName =
      eventType === "click"
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
