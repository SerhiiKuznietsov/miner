import { TailState } from "./tailState";
import { ActionList, StateNamesList } from "../type/type";

export class FalseFlagState extends TailState {
  constructor(list?: ActionList) {
    super(StateNamesList.falseFlagState, list);
  }
}
