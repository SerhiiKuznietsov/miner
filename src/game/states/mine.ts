import { StateNames } from "../config/state";
import { MineView } from "../view/mine";
import { ActionList, TailState } from "./state";

export class MineState extends TailState {
  constructor(list?: ActionList) {
    super(StateNames.mineState, list);
  }

  public draw(element: any): void {
    MineView.setImageMine(element);
  }
}
