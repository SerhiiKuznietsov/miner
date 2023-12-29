import { StateList } from "../type/type";
import { State } from "../state";
import { StateController } from "../../stateController";

// { name: , actionToState: }
export interface IStateControllerOptions<N, A> {
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
  defaultStateName: N,
  options: IStateControllerOptions<N, A>
): StateController<N, A> => {
  const { statesOptionsList } = options;

  const statesList: StateList<State<N, A>> = [];

  statesOptionsList.forEach((statesOptions) => {
    statesList.push(
      spawnState<N, A>(statesOptions.name, statesOptions.actionToState)
    );
  });

  const stateController = new StateController<N, A>(
    defaultStateName,
    statesList
  );

  return stateController;
};
