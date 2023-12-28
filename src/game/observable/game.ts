import { Observable } from "./observable";

export enum GameEvent {
  start = "start",
  restart = "restart",
  win = "win",
  lose = "lose",
}

export type GameEventType = GameEvent.start | GameEvent.restart | GameEvent.win | GameEvent.lose;

class GameObserver extends Observable<GameEventType> {}

export const gameObserver = new GameObserver();
