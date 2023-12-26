import { StateController } from "../../controllers/state-controller";
import {
  spawnMineTailState,
  spawnAroundTailState,
  spawnEmptyTailState,
} from "../../states/spawners";
import { MatrixItem } from "./matrix-item";

export const createTailStateByMatrix = (
  matrixItem: MatrixItem
): StateController => {
  if (matrixItem.isMine) {
    return spawnMineTailState();
  }

  if (matrixItem.around) {
    return spawnAroundTailState();
  }

  return spawnEmptyTailState();
};
