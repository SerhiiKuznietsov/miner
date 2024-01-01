import { gameObserver } from "./observable/gameEvent";
import { GameStateList, GameStateType } from "./stateControllers/states/type/type";

export interface IInterfaceObject {
  init(): void;
  start?(): void;
  restart?(): void;
  win?(): void;
  lose?(): void;
  end?(): void;
}

type StartType = Required<Pick<IInterfaceObject, "start">>;
type ReStartType = Required<Pick<IInterfaceObject, "restart">>;
type WinType = Required<Pick<IInterfaceObject, "win">>;
type LoseType = Required<Pick<IInterfaceObject, "lose">>;
type EndType = Required<Pick<IInterfaceObject, "end">>;

export class Logic {
  private _instanceList = new Set<IInterfaceObject>();
  private _startList = new Set<StartType>();
  private _reStartList = new Set<ReStartType>();
  private _winList = new Set<WinType>();
  private _loseList = new Set<LoseType>();
  private _endList = new Set<EndType>();

  constructor() {
    gameObserver.attach(this.observerHandler.bind(this));
  }

  public add(instance: IInterfaceObject): this {
    this._instanceList.add(instance);

    if (instance[GameStateList.start]) {
      this._startList.add(instance as StartType);
    }

    if (instance[GameStateList.restart]) {
      this._reStartList.add(instance as ReStartType);
    }

    if (instance[GameStateList.win]) {
      this._winList.add(instance as WinType);
    }

    if (instance[GameStateList.lose]) {
      this._loseList.add(instance as LoseType);
    }

    if (instance[GameStateList.end]) {
      this._endList.add(instance as EndType);
    }

    return this;
  }

  private observerHandler(data: GameStateType) {
    if (data === GameStateList.start) {
      this._startList.forEach((instance) => {
        instance.start();
      });
      return;
    }

    if (data === GameStateList.restart) {
      this._reStartList.forEach((instance) => {
        instance.restart();
      });
      return;
    }

    if (data === GameStateList.win) {
      this._winList.forEach((instance) => {
        instance.win();
      });
      return;
    }

    if (data === GameStateList.lose) {
      this._loseList.forEach((instance) => {
        instance.lose();
      });
      return;
    }

    if (data === GameStateList.end) {
      this._endList.forEach((instance) => {
        instance.end();
      });
      return;
    }
  }

  public init(): void {
    this._instanceList.forEach((instance) => {
      instance.init();
    });
  }
}
