import { TileStateController } from "./tileStateController";
import { TileState } from "../tileState";
import {
  ActionNamesList,
  StateNamesList,
} from "../../../../services/stateControllers/type/type";

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
