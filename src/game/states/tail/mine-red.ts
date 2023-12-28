import { TailState } from "./tailState";
import { ActionList, StateNamesList } from "../type/type";

export class RedMineState extends TailState {
  constructor(list?: ActionList) {
    super(StateNamesList.redMineState, list);
  }
}