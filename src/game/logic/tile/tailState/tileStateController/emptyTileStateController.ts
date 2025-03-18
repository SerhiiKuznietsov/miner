import { TileStateController } from "./tileStateController";
import { TileState } from "../tileState";
import {
  ActionNamesList,
  StateNamesList,
} from "../../../../services/stateControllers/type/type";

export class EmptyTileStateController extends TileStateController {
  constructor() {
    super(StateNamesList.closeState, [
      new TileState(StateNamesList.closeState, [
        [ActionNamesList.rightClick, StateNamesList.flagState],
        [ActionNamesList.leftClick, StateNamesList.emptyState],
        [ActionNamesList.calc, StateNamesList.emptyState],
      ]),
      new TileState(StateNamesList.flagState, [
        [ActionNamesList.rightClick, StateNamesList.closeState],
        [ActionNamesList.calc, StateNamesList.emptyState],
        [ActionNamesList.lose, StateNamesList.falseFlagState],
      ]),
      new TileState(StateNamesList.falseFlagState),
      new TileState(StateNamesList.emptyState),
    ]);
  }
}
