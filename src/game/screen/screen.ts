import { GameEvent, GameEventType, gameObserver } from "../observable/gameEvent";
export interface ScreenObject {
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

export class Screen {
  private _instanceList = new Set<ScreenObject>();
  private _startList = new Set<StartObject>();
  private _reStartList = new Set<reStartObject>();
  private _stopList = new Set<StopObject>();
  constructor() {
    gameObserver.attach(this.observerHandler.bind(this));
  }

  public add(instance: ScreenObject): this {
    this._instanceList.add(instance);

    if (instance[GameEvent.start]) {
      this._startList.add(instance as StartObject);
    }

    if (instance[GameEvent.restart]) {
      this._reStartList.add(instance as reStartObject);
    }

    if (instance["stop"]) {
      this._stopList.add(instance as StopObject);
    }

    return this;
  }

  private observerHandler(data: GameEventType) {
    if (data === GameEvent.start) {
      this._startList.forEach((instance) => {
        instance.start();
      });
      return;
    }

    if (data === GameEvent.restart) {
      this._reStartList.forEach((instance) => {
        instance.restart();
      });
      return;
    }

    if (data === GameEvent.win) {
      this._stopList.forEach((instance) => {
        instance.stop();
      });
      return;
    }

    if (data === GameEvent.lose) {
      this._stopList.forEach((instance) => {
        instance.stop();
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
