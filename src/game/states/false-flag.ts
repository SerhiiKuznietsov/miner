import { MineView } from "../view/mine";
import { TailState } from "./state";
import { ActionList, StateNamesList } from "./type/type";

export class FalseFlagState extends TailState {
  constructor(list?: ActionList) {
    super(StateNamesList.falseFlagState, list);
  }

  public draw(element: any): void {
    MineView.setImageMineWrong(element);
  }
}
