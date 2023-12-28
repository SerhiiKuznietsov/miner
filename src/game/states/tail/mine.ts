import { TailState } from "./tailState";
import { ActionList, StateNamesList } from "../type/type";

export class MineState extends TailState {
  constructor(list?: ActionList) {
    super(StateNamesList.mineState, list);
  }
}
