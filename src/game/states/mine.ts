import { MineView } from "../view/mine";
import { TailState } from "./state";
import { ActionList, StateNamesList } from "./type/type";

export class MineState extends TailState {
  constructor(list?: ActionList) {
    super(StateNamesList.mineState, list);
  }

  public draw(element: any): void {
    MineView.setImageMine(element);
  }
}
