import { GameEvent, GameEventType, gameObserver } from "../observable/game";
export interface ScreenObject {
  init(): void;
  start(): void;
  firstClick(): void;
  stop(): void;
}

export class Screen {
  private _instanceList = new Set<ScreenObject>();
  private _startList = new Set<ScreenObject>();
  private _firsClickList = new Set<ScreenObject>();
  private _stopList = new Set<ScreenObject>();
  constructor() {
    gameObserver.attach(this.observerHandler.bind(this));
  }

  public add(instance: ScreenObject): this {
    this._instanceList.add(instance);

    if (instance[GameEvent.start]) {
      this._startList.add(instance);
    }

    if (instance[GameEvent.firstClick]) {
      this._firsClickList.add(instance);
    }

    if (instance["stop"]) {
      this._stopList.add(instance);
    }

    return this;
  }

  private observerHandler(data: GameEventType) {
    if (data === GameEvent.start) {
      this._startList.forEach((instance) => {
        instance[GameEvent.start]();
      });
    }

    if (data === GameEvent.firstClick) {
      this._firsClickList.forEach((instance) => {
        instance[GameEvent.firstClick]();
      });
    }

    if (data === GameEvent.win) {
      this._stopList.forEach((instance) => {
        instance["stop"]();
      });
    }

    if (data === GameEvent.lose) {
      this._stopList.forEach((instance) => {
        instance["stop"]();
      });
    }
  }

  public init(): void {
    this._stopList.forEach((instance) => {
      instance.init();
    });
  }
}
