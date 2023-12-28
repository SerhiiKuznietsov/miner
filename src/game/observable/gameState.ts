import { Observable } from "./observable";

export enum GameChangeStatus {
  toStart = "toStart",
  toRestart = "toRestart",
  toWin = "toWin",
  toLose = "toLose",
  toEnd = "toEnd",
}

export type GameEventType =
  | GameChangeStatus.toStart
  | GameChangeStatus.toRestart
  | GameChangeStatus.toWin
  | GameChangeStatus.toLose
  | GameChangeStatus.toEnd;

class GameStateObserver extends Observable<GameEventType> {}

export const gameStateObserver = new GameStateObserver();
