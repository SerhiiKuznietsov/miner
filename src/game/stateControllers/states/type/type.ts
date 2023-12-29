import { ActionName } from "../../../actions/actions";

export enum StateNamesList {
  closeState = "closeState",
  redMineState = "redMineState",
  mineState = "mineState",
  aroundState = "aroundState",
  flagState = "flagState",
  falseFlagState = "falseFlagState",
  emptyState = "emptyState",
}

export type StateList<S> = Array<S>;
export type ActionList<A, S> = Array<[A, S]>;
export type TailActionListType = ActionList<ActionName, StateNameType>;
export type StateNameType =
  | StateNamesList.closeState
  | StateNamesList.redMineState
  | StateNamesList.mineState
  | StateNamesList.aroundState
  | StateNamesList.flagState
  | StateNamesList.falseFlagState
  | StateNamesList.emptyState;

export enum GameStateList {
  init = "init",
  start = "start",
  readyToStart = "readyToStart",
  win = "win",
  lose = "lose",
  restart = "restart",
  end = "end",
}

export type GameStateType =
  | GameStateList.init
  | GameStateList.start
  | GameStateList.readyToStart
  | GameStateList.win
  | GameStateList.lose
  | GameStateList.restart
  | GameStateList.end;

export type GameActionListType = ActionList<GameActionNameType, GameStateType>;

export enum GameAction {
  toStart = "toStart",
  toRestart = "toRestart",
  toReadyToStart = "toReadyToStart",
  toWin = "toWin",
  toLose = "toLose",
  toEnd = "toEnd",
}

export type GameActionNameType =
  | GameAction.toStart
  | GameAction.toRestart
  | GameAction.toWin
  | GameAction.toLose
  | GameAction.toReadyToStart
  | GameAction.toEnd;
