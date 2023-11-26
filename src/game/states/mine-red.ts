import { MineView } from "../view/mine";
import { TailState } from "./state";
import { ActionList, StateNamesList } from "./type/type";

export class RedMineState extends TailState {
  constructor(list?: ActionList) {
    super(StateNamesList.redMineState, list);
  }

  public draw(element: any): void {
    MineView.setImageMineRed(element);
  }
}
