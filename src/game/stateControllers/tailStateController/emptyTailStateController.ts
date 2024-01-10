import { TailStateController } from "./tailStateController";
import { ActionNamesList } from "../../actions/actions";
import { TailState } from "../states/tail/tailState";
import { StateNamesList } from "../states/type/type";

export class EmptyTailStateController extends TailStateController {
  constructor() {
    super(StateNamesList.closeState, [
      new TailState(StateNamesList.closeState, [
        [ActionNamesList.rightClick, StateNamesList.flagState],
        [ActionNamesList.leftClick, StateNamesList.emptyState],
        [ActionNamesList.calc, StateNamesList.emptyState],
      ]),
      new TailState(StateNamesList.flagState, [
        [ActionNamesList.rightClick, StateNamesList.closeState],
        [ActionNamesList.calc, StateNamesList.emptyState],
        [ActionNamesList.lose, StateNamesList.falseFlagState],
      ]),
      new TailState(StateNamesList.falseFlagState),
      new TailState(StateNamesList.emptyState),
    ]);
  }
}