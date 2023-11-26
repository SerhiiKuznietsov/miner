import { StateNames } from "../config/state";
import { MineView } from "../view/mine";
import { ActionList, TailState } from "./state";

export class FalseFlagState extends TailState {
  constructor(list?: ActionList) {
    super(StateNames.falseFlagState, list);
  }

  public draw(element: any): void {
    MineView.setImageMineWrong(element);
  }
}
