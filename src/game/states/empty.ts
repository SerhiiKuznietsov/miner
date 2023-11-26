import { StateNames } from "../config/state";
import { MineView } from "../view/mine";
import { ActionList, TailState } from "./state";

export class EmptyState extends TailState {
  constructor(list?: ActionList) {
    super(StateNames.emptyState, list);
  }

  public draw(element: any): void {
    MineView.setImageType(element);
  }
}
