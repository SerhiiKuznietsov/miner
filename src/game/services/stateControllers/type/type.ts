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
export type StateNameType =
  | StateNamesList.closeState
  | StateNamesList.redMineState
  | StateNamesList.mineState
  | StateNamesList.aroundState
  | StateNamesList.flagState
  | StateNamesList.falseFlagState
  | StateNamesList.emptyState;

export enum GameStateList {
  start = "start",
  readyToStart = "readyToStart",
  win = "win",
  lose = "lose",
  restart = "restart",
  end = "end",
}

export type GameStateType =
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
  toWin = "toWin",
  toLose = "toLose",
  toEnd = "toEnd",
}

export type GameActionNameType =
  | GameAction.toStart
  | GameAction.toRestart
  | GameAction.toWin
  | GameAction.toLose
  | GameAction.toEnd;

export enum ActionNamesList {
  rightClick = "rightClick",
  leftClick = "leftClick",
  lose = "lose",
  win = "win",
  calc = "calc",
}

export type ActionName =
  | ActionNamesList.rightClick
  | ActionNamesList.leftClick
  | ActionNamesList.lose
  | ActionNamesList.win
  | ActionNamesList.calc;

// TODO - put this code from here
