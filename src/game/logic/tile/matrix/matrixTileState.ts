import { TileStateController } from "../../../stateControllers/tileStateController/tileStateController";
import { AroundTileStateController } from "../../../stateControllers/tileStateController/aroundTileStateController";
import { EmptyTileStateController } from "../../../stateControllers/tileStateController/emptyTileStateController";
import { MineTileStateController } from "../../../stateControllers/tileStateController/mineTileStateController";
import { MatrixItem } from "./matrixItem";

export const createTileStateByMatrix = (
  matrixItem: MatrixItem
): TileStateController => {
  if (matrixItem.isMine) {
    return new MineTileStateController();
  }

  if (matrixItem.around) {
    return new AroundTileStateController();
  }

  return new EmptyTileStateController();
};
