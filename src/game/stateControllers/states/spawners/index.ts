import { StateList } from "../type/type";
import { State } from "../state";
import { StateController } from "../../stateController";

// { name: , actionToState: }
export interface IStateControllerOptions<N, A> {
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

export const spawnStateController = <N, A>(
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

