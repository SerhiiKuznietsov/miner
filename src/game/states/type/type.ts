import { ActionName } from "../../actions/actions";
import { TailState } from "../tail/tailState";

export enum StateNamesList {
  closeState = "closeState",
  redMineState = "redMineState",
  mineState = "mineState",
  aroundState = "aroundState",
  flagState = "flagState",
  falseFlagState = "falseFlagState",
  emptyState = "emptyState",
}

export type StateList = Array<TailState>;
export type ActionList = Array<[ActionName, StateName]>;
export type StateName =
  | StateNamesList.closeState
  | StateNamesList.redMineState
  | StateNamesList.mineState
  | StateNamesList.aroundState
  | StateNamesList.flagState
  | StateNamesList.falseFlagState
  | StateNamesList.emptyState;
