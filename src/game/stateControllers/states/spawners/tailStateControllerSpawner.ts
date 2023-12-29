import { spawnStateController } from ".";
import { ActionName, ActionNamesList } from "../../../actions/actions";
import { TailStateController } from "../../tailStateController";
import { StateNameType, StateNamesList } from "../type/type";

const spawnTailStateController = spawnStateController<
  StateNameType,
  ActionName
>;

export const spawnEmptyTailState = (): TailStateController => {
  return spawnTailStateController({
    defaultState: StateNamesList.closeState,
    statesOptionsList: [
      {
        name: StateNamesList.closeState,
        actionToState: [
          [ActionNamesList.rightClick, StateNamesList.flagState],
          [ActionNamesList.leftClick, StateNamesList.emptyState],
          [ActionNamesList.calc, StateNamesList.emptyState],
        ],
      },
      {
        name: StateNamesList.flagState,
        actionToState: [
          [ActionNamesList.rightClick, StateNamesList.closeState],
          [ActionNamesList.calc, StateNamesList.emptyState],
          [ActionNamesList.lose, StateNamesList.falseFlagState],
        ],
      },
      {
        name: StateNamesList.falseFlagState,
        actionToState: [],
      },
      {
        name: StateNamesList.emptyState,
        actionToState: [],
      },
    ],
  });
};

export const spawnAroundTailState = (): TailStateController => {
  return spawnTailStateController({
    defaultState: StateNamesList.closeState,
    statesOptionsList: [
      {
        name: StateNamesList.closeState,
        actionToState: [
          [ActionNamesList.rightClick, StateNamesList.flagState],
          [ActionNamesList.leftClick, StateNamesList.aroundState],
          [ActionNamesList.calc, StateNamesList.aroundState],
        ],
      },
      {
        name: StateNamesList.flagState,
        actionToState: [
          [ActionNamesList.rightClick, StateNamesList.closeState],
          [ActionNamesList.calc, StateNamesList.aroundState],
          [ActionNamesList.lose, StateNamesList.falseFlagState],
        ],
      },
      {
        name: StateNamesList.falseFlagState,
        actionToState: [],
      },
      {
        name: StateNamesList.aroundState,
        actionToState: [],
      },
    ],
  });
};

export const spawnMineTailState = (): TailStateController => {
  return spawnTailStateController({
    defaultState: StateNamesList.closeState,
    statesOptionsList: [
      {
        name: StateNamesList.closeState,
        actionToState: [
          [ActionNamesList.rightClick, StateNamesList.flagState],
          [ActionNamesList.leftClick, StateNamesList.redMineState],
          [ActionNamesList.win, StateNamesList.flagState],
          [ActionNamesList.lose, StateNamesList.mineState],
        ],
      },
      {
        name: StateNamesList.flagState,
        actionToState: [
          [ActionNamesList.rightClick, StateNamesList.closeState],
        ],
      },
      {
        name: StateNamesList.redMineState,
        actionToState: [],
      },
      {
        name: StateNamesList.mineState,
        actionToState: [],
      },
    ],
  });
};
