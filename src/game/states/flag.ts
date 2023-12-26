import { TailState } from "./state";
import { ActionList, StateNamesList } from "./type/type";

export class FlagState extends TailState {
  constructor(list: ActionList) {
    super(StateNamesList.flagState, list);
  }
}
