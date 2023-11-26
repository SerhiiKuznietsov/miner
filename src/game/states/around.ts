import { StateNames } from "../config/state";
import { MineView } from "../view/mine";
import { ActionList, TailState } from "./state";

export class AroundState extends TailState {
  private _around: number;

  constructor(around: number, list?: ActionList) {
    super(StateNames.aroundState, list);
    this._around = around;
  }

  public draw(element: any): void {
    MineView.setImageType(element, this._around);
  }
}
