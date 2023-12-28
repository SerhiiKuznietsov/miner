import { TailState } from "./tailState";
import { ActionList, StateNamesList } from "../type/type";

export class FlagState extends TailState {
  constructor(list: ActionList) {
    super(StateNamesList.flagState, list);
  }
}
