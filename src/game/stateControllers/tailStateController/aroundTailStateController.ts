import { TailStateController } from "./tailStateController";
import { ActionNamesList } from "../../actions/actions";
import { TailState } from "../states/tailState";
import { StateNamesList } from "../states/type/type";

export class AroundTailStateController extends TailStateController {
  constructor() {
    super(StateNamesList.closeState, [
      new TailState(StateNamesList.closeState, [
        [ActionNamesList.rightClick, StateNamesList.flagState],
        [ActionNamesList.leftClick, StateNamesList.aroundState],
        [ActionNamesList.calc, StateNamesList.aroundState],
      ]),
      new TailState(StateNamesList.flagState, [
        [ActionNamesList.rightClick, StateNamesList.closeState],
        [ActionNamesList.calc, StateNamesList.aroundState],
        [ActionNamesList.lose, StateNamesList.falseFlagState],
      ]),
      new TailState(StateNamesList.falseFlagState),
      new TailState(StateNamesList.aroundState),
    ]);
  }
}