import { TileStateController } from "./tileStateController";
import { TileState } from "../tileState";
import {
  ActionNamesList,
  StateNamesList,
} from "../../../../services/stateControllers/type/type";

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
