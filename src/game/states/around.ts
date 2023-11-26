import { MineView } from "../view/mine";
import { TailState } from "./state";
import { ActionList, StateNamesList } from "./type/type";

export class AroundState extends TailState {
  private _around: number;

  constructor(around: number, list?: ActionList) {
    super(StateNamesList.aroundState, list);
    this._around = around;
  }

  public draw(element: any): void {
    MineView.setImageType(element, this._around);
  }
}
