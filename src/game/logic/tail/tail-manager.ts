import { ActionName, ActionNamesList } from "../../actions/actions";
import { Config } from "../../config/game";
import { Vector2 } from "../../geometry/vector2";
import { spawnTailMatrix } from "./matrix/matrix";
import {
  GameAction,
  StateNamesList,
} from "../../stateControllers/states/type/type";
import { createId, parseId } from "../../utils/id";
import { Tail } from "./tail";
import { ClickEvent, ClickEventObserverDataType } from "./type/type";
import { getAttrsWithEvent } from "./utils/click";
import { gameStateObserver } from "../../observable/gameState";
import { FieldView } from "../field/fieldView";

export class TailManager {
  private _tails = new Map<string, Tail>();
  private _config: Config;
  private _firstClick: Vector2 | undefined;
  private _calculatedTails = new Set<string>();
  private _view: FieldView;

  constructor(config: Config) {
    this._config = config;
    this._view = new FieldView(this._config, this.clickHandler.bind(this));
  }

  private get(id: string): Tail {
    const tail = this._tails.get(id);

    if (!tail) {
      throw new Error(`Tail with id: ${id} not found`);
    }

    return tail;
  }

  private clickHandler(data: ClickEventObserverDataType): void {
    const [eventName, e] = data;

    const id = getAttrsWithEvent(e);

    if (!this._firstClick) {
      const [x, y] = parseId(id);

      this._firstClick = new Vector2(x, y);

      gameStateObserver.notify(GameAction.toStart);
    }

    const actionName: ActionName =
      eventName === ClickEvent.left
        ? ActionNamesList.leftClick
        : ActionNamesList.rightClick;

    this.useActionById(id, actionName);
  }

  private clear(): void {
    this._tails.clear();
    this._calculatedTails.clear();
    this._firstClick = undefined;
  }

  private createTails(): void {
    const tailMatrix = spawnTailMatrix(this._config, this._firstClick);

    tailMatrix.forEach((tailMatrixItem) => {
      const [id, StateController, around] = tailMatrixItem;

      this._tails.set(id, new Tail(StateController, id, around));
    });
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
    this.createTails();
  }

  public restart(): void {
    this.clear();
    this.createTails();
    this._view.restart();
  }

  public end(): void {
    this._view.end();
  }

  public useActionById(id: string, actionName: ActionName): void {
    if (actionName === ActionNamesList.calc) {
      if (!this._calculatedTails.has(id)) {
        this._calculatedTails.add(id);
      } else {
        return;
      }
    }

    const newState = this.get(id).useAction(actionName);

    if (!newState || newState !== StateNamesList.emptyState) return;

    this.openAround(id);
  }
}
