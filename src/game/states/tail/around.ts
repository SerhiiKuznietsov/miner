import { TailState } from "./tailState";
import { ActionList, StateNamesList } from "../type/type";

export class AroundState extends TailState {
  constructor(list?: ActionList) {
    super(StateNamesList.aroundState, list);
  }
}
