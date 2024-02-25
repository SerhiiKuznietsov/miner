import { TailStateController } from "./tailStateController";
import { ActionNamesList } from "../../actions/actions";
import { TailState } from "../states/tailState";
import { StateNamesList } from "../states/type/type";

export class MineTailStateController extends TailStateController {
  constructor() {
    super(StateNamesList.closeState, [
      new TailState(StateNamesList.closeState, [
        [ActionNamesList.rightClick, StateNamesList.flagState],
        [ActionNamesList.leftClick, StateNamesList.redMineState],
        [ActionNamesList.win, StateNamesList.flagState],
        [ActionNamesList.lose, StateNamesList.mineState],
      ]),
      new TailState(StateNamesList.flagState, [
        [ActionNamesList.rightClick, StateNamesList.closeState],
      ]),
      new TailState(StateNamesList.redMineState),
      new TailState(StateNamesList.mineState),
    ]);
  }
}
