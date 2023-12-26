import { TailState } from "./state";
import { ActionList, StateNamesList } from "./type/type";

export class CloseState extends TailState {
  constructor(list: ActionList) {
    super(StateNamesList.closeState, list);
  }
}
