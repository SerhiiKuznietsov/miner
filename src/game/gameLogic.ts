import { gameObserver } from "./observable/gameEvent";
import { GameStateList, GameStateType } from "./stateControllers/states/type/type";

export interface IInterfaceObject {
  [GameStateList.init](): void;
  [GameStateList.start]?(): void;
  [GameStateList.readyToStart]?(): void;
  [GameStateList.restart]?(): void;
  [GameStateList.win]?(): void;
  [GameStateList.lose]?(): void;
  [GameStateList.end]?(): void;
}

export class GameLogic {
  private _interactionList = new Map<GameStateType, IInterfaceObject[]>([
    [GameStateList.start, []],
    [GameStateList.restart, []],
    [GameStateList.win, []],
    [GameStateList.lose, []],
    [GameStateList.end, []],
  ]);
  private _instancesList = new Set<IInterfaceObject>();

  constructor() {
    gameObserver.attach(this.observerHandler.bind(this));
  }

  public add(instance: IInterfaceObject): this {
    this._instancesList.add(instance);

    this._interactionList.forEach((arr, key) => {

      if (instance[key] === undefined) return;

      arr.push(instance);
    })

    return this;
  }

  private observerHandler(stateName: GameStateType): void {
    const instanceList = this._interactionList.get(stateName);

    if (!instanceList?.length) return;

    instanceList.forEach((instance: any) => instance[stateName]());
  }

  public init(): void {
    this._instancesList.forEach((instance) => instance.init());
  }
}
