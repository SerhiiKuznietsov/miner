import { Action, CalcAction } from "../actions/actions";
import { Config } from "../config/game";
import { MatrixGenerateContent } from "../matrix/type/type";
import { gameObserver } from "../observable/game";
import { StateNamesList } from "../states/type/type";
import { createId, parseId } from "../utils/id";
import { Tail } from "./tail";

export class TailManager {
  private _tails = new Map<string, Tail>();
  private _config: Config;
  private _openField: number = 0;

  constructor(config: Config) {
    this._config = config;
  }

  private get(id: string): Tail {
    const tail = this._tails.get(id);

    if (!tail) {
      throw new Error(`Tail with id: ${id} not found`);
    }

    return tail;
  }

  private clear(): void {
    this._tails.clear();
  }

  public init(content: MatrixGenerateContent): void {
    this.clear();

    content.forEach((content) => {
      const [id, StateController, around] = content;

      this._tails.set(id, new Tail(StateController, id, around));
    });
  }

  public useActionById(id: string, action: Action): void {
    const newState = this.get(id).useAction(action);

    if (newState === StateNamesList.redMineState) {
      gameObserver.notify("lose");
    }

    this.openAround(id, newState);

    if (this._openField === this._config.needToOpen) {
      gameObserver.notify("win");
    }
  }

  private openAround(id: string, newState: string | undefined): void {
    const [x, y] = parseId(id);

    if (
      newState === StateNamesList.emptyState ||
      newState === StateNamesList.aroundState
    ) {
      this._openField++;
    }

    if (newState !== StateNamesList.emptyState) return;

    for (let i = x > 0 ? x - 1 : x; i <= x + 1 && i < this._config.cols; i++) {
      for (
        let j = y > 0 ? y - 1 : y;
        j <= y + 1 && j < this._config.rows;
        j++
      ) {
        const newId = createId(i, j);
        const newState = this.get(newId).useAction(new CalcAction());

        this.openAround(newId, newState);
      }
    }
  }
}
