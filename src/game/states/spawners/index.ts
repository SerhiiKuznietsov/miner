import { ActionNamesList } from "../../actions/actions";
import { StateController } from "../../controllers/state-controller";
import { AroundState } from "../around";
import { CloseState } from "../close";
import { EmptyState } from "../empty";
import { FalseFlagState } from "../false-flag";
import { FlagState } from "../flag";
import { MineState } from "../mine";
import { RedMineState } from "../mine-red";
import { StateNamesList } from "../type/type";

export const spawnEmptyTailState = (): StateController => {
  return new StateController([
    new CloseState([
      [ActionNamesList.rightClick, StateNamesList.flagState],
      [ActionNamesList.leftClick, StateNamesList.emptyState],
      [ActionNamesList.calc, StateNamesList.emptyState],
    ]),
    new FlagState([
      [ActionNamesList.rightClick, StateNamesList.closeState],
      [ActionNamesList.calc, StateNamesList.emptyState],
      [ActionNamesList.lose, StateNamesList.falseFlagState],
    ]),
    new FalseFlagState(),
    new EmptyState(),
  ]);
};

export const spawnAroundTailState = (): StateController => {
  return new StateController([
    new CloseState([
      [ActionNamesList.rightClick, StateNamesList.flagState],
      [ActionNamesList.leftClick, StateNamesList.aroundState],
      [ActionNamesList.calc, StateNamesList.aroundState],
    ]),
    new FlagState([
      [ActionNamesList.rightClick, StateNamesList.closeState],
      [ActionNamesList.calc, StateNamesList.aroundState],
      [ActionNamesList.lose, StateNamesList.falseFlagState],
    ]),
    new FalseFlagState(),
    new AroundState(),
  ]);
};

export const spawnMineTailState = (): StateController => {
  return new StateController([
    new CloseState([
      [ActionNamesList.rightClick, StateNamesList.flagState],
      [ActionNamesList.leftClick, StateNamesList.redMineState],
      [ActionNamesList.win, StateNamesList.flagState],
      [ActionNamesList.lose, StateNamesList.mineState],
    ]),
    new FlagState([[ActionNamesList.rightClick, StateNamesList.closeState]]),
    new RedMineState(),
    new MineState(),
  ]);
};
