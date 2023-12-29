import {
  gameObserver,
} from "../observable/gameEvent";
import { GameStateList, GameStateType } from "../stateControllers/states/type/type";

export interface ManagerObject {
  init(): void;
  start?(): void;
  restart?(): void;
  stop?(): void;
}

interface StartObject {
  start(): void;
}

interface reStartObject {
  restart(): void;
}

interface StopObject {
  stop(): void;
}

export class ManagerController {
  private _managerList = new Set<ManagerObject>();
  private _reStartList = new Set<reStartObject>();
  private _startList = new Set<StartObject>();
  private _stopList = new Set<StopObject>();

  constructor() {
    gameObserver.attach(this.observerHandler.bind(this));
  }

  public add(manager: ManagerObject): this {
    if (this._managerList.has(manager)) {
      throw new Error(`Duplicate manager ${manager}`);
    }

    this._managerList.add(manager);

    if (manager[GameStateList.start]) {
      this._startList.add(manager as StartObject);
    }

    if (manager[GameStateList.restart]) {
      this._reStartList.add(manager as reStartObject);
    }

    if (manager["stop"]) {
      this._stopList.add(manager as StopObject);
    }

    return this;
  }

  public init() {
    this._managerList.forEach((manager) => manager.init());
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
      this._stopList.forEach((instance) => {
        instance.stop();
      });
      return;
    }

    if (data === GameStateList.lose) {
      this._stopList.forEach((instance) => {
        instance.stop();
      });
      return;
    }
  }
}
