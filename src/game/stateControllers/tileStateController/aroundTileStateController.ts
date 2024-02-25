import { TileStateController } from "./tileStateController";
import { ActionNamesList } from "../../actions/actions";
import { TileState } from "../states/tileState";
import { StateNamesList } from "../states/type/type";

export class AroundTileStateController extends TileStateController {
  constructor() {
    super(StateNamesList.closeState, [
      new TileState(StateNamesList.closeState, [
        [ActionNamesList.rightClick, StateNamesList.flagState],
        [ActionNamesList.leftClick, StateNamesList.aroundState],
        [ActionNamesList.calc, StateNamesList.aroundState],
      ]),
      new TileState(StateNamesList.flagState, [
        [ActionNamesList.rightClick, StateNamesList.closeState],
        [ActionNamesList.calc, StateNamesList.aroundState],
        [ActionNamesList.lose, StateNamesList.falseFlagState],
      ]),
      new TileState(StateNamesList.falseFlagState),
      new TileState(StateNamesList.aroundState),
    ]);
  }
}
