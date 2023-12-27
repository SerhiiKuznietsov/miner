import { Observable } from "./observable";

export enum GameEvent {
  start = "start",
  win = "win",
  lose = "lose",
  firstClick = "firstClick",
}

export type GameEventType = GameEvent.start | GameEvent.win | GameEvent.lose | GameEvent.firstClick;

class GameObserver extends Observable<GameEventType> {}

export const gameObserver = new GameObserver();
