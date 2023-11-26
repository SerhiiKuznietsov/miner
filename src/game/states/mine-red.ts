import { StateNames } from "../config/state";
import { MineView } from "../view/mine";
import { ActionList, TailState } from "./state";

export class RedMineState extends TailState {
  constructor(list?: ActionList) {
    super(StateNames.redMineState, list);
  }

  public draw(element: any): void {
    MineView.setImageMineRed(element);
  }
}
