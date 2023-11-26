import { StateNames } from "../config/state";
import { MineView } from "../view/mine";
import { ActionList, TailState } from "./state";

export class FlagState extends TailState {
  constructor(list: ActionList) {
    super(StateNames.flagState, list);
  }

  public draw(element: any): void {
    MineView.setImageFlag(element);
  }
}
