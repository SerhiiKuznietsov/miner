import { TailState } from "./state";
import { ActionList, StateNamesList } from "./type/type";

export class AroundState extends TailState {
  constructor(list?: ActionList) {
    super(StateNamesList.aroundState, list);
  }
}
