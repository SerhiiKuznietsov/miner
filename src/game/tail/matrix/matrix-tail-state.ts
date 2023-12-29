import { TailStateController } from "../../stateControllers/tailStateController";
import {
  spawnMineTailState,
  spawnAroundTailState,
  spawnEmptyTailState,
} from "../../stateControllers/states/spawners";
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
