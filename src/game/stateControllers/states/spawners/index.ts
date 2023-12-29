import { ActionName, ActionNamesList } from "../../../actions/actions";
import { TailStateController } from "../../tailStateController";
import { StateList, StateNameType, StateNamesList } from "../type/type";
import { State } from "../state";
import { StateController } from "../../stateController";

// { name: , actionToState: }
interface IStateControllerOptions<N, A> {
  defaultState: N;
  statesOptionsList: Array<IStateOptions<N, A>>;
}

interface IStateOptions<N, A> {
  name: N;
  actionToState: Array<[A, N]>;
}

const spawnState = <N, A>(
  name: N,
  actionToState: Array<[A, N]>
): State<N, A> => {
  const state = new State<N, A>(name, actionToState);

  return state;
};

const spawnStateController = <N, A>(
  options: IStateControllerOptions<N, A>
): StateController<N, A> => {
  const { defaultState, statesOptionsList } = options;

  const statesList: StateList<State<N, A>> = [];

  statesOptionsList.forEach((statesOptions) => {
    statesList.push(
      spawnState<N, A>(statesOptions.name, statesOptions.actionToState)
    );
  });

  const stateController = new StateController<N, A>(defaultState, statesList);

  return stateController;
};

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
