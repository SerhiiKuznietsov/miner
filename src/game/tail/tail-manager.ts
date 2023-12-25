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

  private get(x: number, y: number): Tail {
    const tail = this._tails.get(createId(x, y));

    if (!tail) {
      throw new Error(`Tail with x: ${x} y: ${y} not found`);
    }

    return tail;
  }

  private clear(): void {
    this._tails.clear();
  }

  public init(content: MatrixGenerateContent): void {
    this.clear();

    content.forEach((content) => {
      const [id, element, StateController] = content;

      this._tails.set(id, new Tail(element, StateController));
    });
  }

  public useActionById(id: string, action: Action): void {
    const [x, y] = parseId(id);


    const newState = this.get(x, y).useAction(action);

    if (newState === StateNamesList.redMineState) {
      gameObserver.notify("lose");
    }

    this.openAround(x, y, newState);

    if (this._openField === this._config.needToOpen) {
      gameObserver.notify("win");
    }
  }

  private openAround(x: number, y: number, newState: string | undefined): void {
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
        const newState = this.get(i, j).useAction(new CalcAction());

        this.openAround(i, j, newState);
      }
    }
  }
}
