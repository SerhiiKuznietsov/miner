import { TailState } from "./tailState";
import { ActionList, StateNamesList } from "../type/type";

export class EmptyState extends TailState {
  constructor(list?: ActionList) {
    super(StateNamesList.emptyState, list);
  }
}
