import { StateNames } from "../config/state";
import { MineView } from "../view/mine";
import { ActionList, TailState } from "./state";

export class CloseState extends TailState {
  constructor(list: ActionList) {
    super(StateNames.closeState, list);
  }

  public draw(element: any): void {
    MineView.setImageClosed(element);
  }
}
