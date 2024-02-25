import { TileStateController } from "./tileStateController";
import { ActionNamesList } from "../../actions/actions";
import { TileState } from "../states/tileState";
import { StateNamesList } from "../states/type/type";

export class MineTileStateController extends TileStateController {
  constructor() {
    super(StateNamesList.closeState, [
      new TileState(StateNamesList.closeState, [
        [ActionNamesList.rightClick, StateNamesList.flagState],
        [ActionNamesList.leftClick, StateNamesList.redMineState],
        [ActionNamesList.win, StateNamesList.flagState],
        [ActionNamesList.lose, StateNamesList.mineState],
      ]),
      new TileState(StateNamesList.flagState, [
        [ActionNamesList.rightClick, StateNamesList.closeState],
      ]),
      new TileState(StateNamesList.redMineState),
      new TileState(StateNamesList.mineState),
    ]);
  }
}
