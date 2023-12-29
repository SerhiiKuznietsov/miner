import {
  spawnAroundTailState,
  spawnEmptyTailState,
  spawnMineTailState,
} from "../../stateControllers/states/spawners/tailStateControllerSpawner";
import { TailStateController } from "../../stateControllers/tailStateController";

import { MatrixItem } from "./matrix-item";

export const createTailStateByMatrix = (
  matrixItem: MatrixItem
): TailStateController => {
  if (matrixItem.isMine) {
    return spawnMineTailState();
  }

  if (matrixItem.around) {
    return spawnAroundTailState();
  }

  return spawnEmptyTailState();
};
