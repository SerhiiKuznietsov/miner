import { ActionName } from "../../actions/type/type";

export type ActionList = Array<[ActionName, StateName]>;
export enum StateNamesList {
  startState = "startState",
  closeState = "closeState",
  redMineState = "redMineState",
  mineState = "mineState",
  aroundState = "aroundState",
  flagState = "flagState",
  falseFlagState = "falseFlagState",
  emptyState = "emptyState",
}

export type StateName =
  | StateNamesList.startState
  | StateNamesList.closeState
  | StateNamesList.redMineState
  | StateNamesList.mineState
  | StateNamesList.aroundState
  | StateNamesList.flagState
  | StateNamesList.falseFlagState
  | StateNamesList.emptyState;
