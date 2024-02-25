import {
  StateNameType,
  StateNamesList,
} from "../../../services/stateControllers/type/type";

const stateToView: Record<StateNameType, Function> = {
  [StateNamesList.aroundState]: (around: number = 0): string => `type${around}`,
  [StateNamesList.closeState]: () => "closed",
  [StateNamesList.emptyState]: () => "type0",
  [StateNamesList.falseFlagState]: () => "mine_wrong",
  [StateNamesList.flagState]: () => "flag",
  [StateNamesList.mineState]: () => "mine",
  [StateNamesList.redMineState]: () => "mine_red",
};

export const getAttrValueByState = (
  stateName: StateNameType,
  around: number | undefined
): string => {
  if (!stateToView.hasOwnProperty(stateName)) {
    throw new Error(`state with name "${stateName}" not found`);
  }

  const func: Function = stateToView[stateName];

  return func(around);
};
