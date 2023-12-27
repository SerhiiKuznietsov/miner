import { Observable } from "./observable";

export enum GameEvent {
  start = "start",
  win = "win",
  lose = "lose",
}

export type GameEventType = GameEvent.start | GameEvent.win | GameEvent.lose;

class GameObserver extends Observable<GameEventType> {}

export const gameObserver = new GameObserver();
