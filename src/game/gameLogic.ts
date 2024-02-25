import { gameObserver } from "./observable/gameEvent";
import {
  GameStateList,
  GameStateType,
} from "./stateControllers/states/type/type";

export interface IInterfaceObject {
  [GameStateList.start]?(): void;
  [GameStateList.restart]?(): void;
  [GameStateList.win]?(): void;
  [GameStateList.lose]?(): void;
  [GameStateList.end]?(): void;
}
// TODO - split interfaces into several

export class GameLogic {
  private _interactionList = new Map<GameStateType, IInterfaceObject[]>([
    [GameStateList.start, []],
    [GameStateList.restart, []],
    [GameStateList.win, []],
    [GameStateList.lose, []],
    [GameStateList.end, []],
  ]);

  constructor() {
    gameObserver.attach(this.observerHandler.bind(this));
  }

  public add(instance: any): this {
    this._interactionList.forEach((arr, key) => {
      if (instance[key] === undefined) return;

      arr.push(instance);
    });

    return this;
  }

  private observerHandler(stateName: GameStateType): void {
    const instanceList = this._interactionList.get(stateName);

    if (!instanceList?.length) return;

    instanceList.forEach((instance: any) => instance[stateName]());
  }

  public init(): void {
    const restartFunctionList = this._interactionList.get(GameStateList.restart);

    restartFunctionList?.forEach((instance: any) => instance.restart());
  }
}
