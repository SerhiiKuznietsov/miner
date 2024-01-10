
import { TailStateController } from "../../stateControllers/tailStateController/tailStateController";
import { AroundTailStateController } from "../../stateControllers/tailStateController/aroundTailStateController";
import { EmptyTailStateController } from "../../stateControllers/tailStateController/emptyTailStateController";
import { MineTailStateController } from "../../stateControllers/tailStateController/mineTailStateController";
import { MatrixItem } from "./matrix-item";

export const createTailStateByMatrix = (
  matrixItem: MatrixItem
): TailStateController => {
  if (matrixItem.isMine) {
    return new MineTailStateController();
  }

  if (matrixItem.around) {
    return new AroundTailStateController();
  }

  return new EmptyTailStateController();
};
